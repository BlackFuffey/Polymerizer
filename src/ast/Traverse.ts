import { KevlarVisitorBase, KevlarDefaultVisitorBase } from "../cst/Cst.js";
import {
    StatementCtx,
    VariableDeclarationCtx,
    ProgramCtx,
    ExitCtx,
    AssignmentCtx,
    ExpressionCtx,
    ASTNode,
    ASTNodeTypes,
    ASTExpression,
    ASTExpTypes,
} from "./types.js";
import { CompileError } from "../types.js";
import extractSnippet from "../utils/snippet.js";
import { CstElement, CstNode, IToken } from "chevrotain";
import { InvalidType, VariableCastLoss, VariableRedeclare, VariableUndeclared } from "../cst/errors.js";

class KevlarVisitor extends KevlarVisitorBase {

    private variables: {
        [key: string]: ASTExpression;
    }

    constructor() {
        super();
        this.validateVisitor();
        this.variables = {};
    }    

    program(ctx: ProgramCtx): ASTNode {
        let ast: ASTNode = {
            type: ASTNodeTypes.PROGRAM,
            children: []
        };

        ctx.statement.forEach((statementNode) => {
            ast.children!.push(this.visit(statementNode));
        });

        return ast;
    }

    statement(ctx: StatementCtx): ASTNode {
        if (ctx.variableDeclaration) {
            return this.visit(ctx.variableDeclaration[0]);
        }
        if (ctx.assignment) {
            return this.visit(ctx.assignment[0]);
        }
        if (ctx.exit) {
            return this.visit(ctx.exit[0]);
        }

        return {
            type: ASTNodeTypes.UNIMPLEMENTED,
        }
    }

    variableDeclaration(ctx: VariableDeclarationCtx): ASTNode {
        const variable = ctx.varName[0];
        let node: ASTNode = {
            type: ASTNodeTypes.VARIABLE_DECLARE,
            props: {
                varname: variable.image,
                type: typeTokenToExpType(ctx.dataType[0]),
                assign: null
            }
        }

        if (this.variables[variable.image]) {
            accumErr({
                header: VariableRedeclare(variable.image),
                ...extractSnippet(
                    variable.startOffset,
                    variable.endOffset || variable.startOffset
                ),
                line: variable.startLine || -1,
                column: variable.startColumn || -1,
            })
        } else {
            this.variables[variable.image] = typeTokenToExpType(ctx.dataType[0]);
        }

        if (ctx.initialValue) {
            node.props.assign = this.visit(ctx.initialValue[0]); // Process the initial assignment

            if (!isLosslessCast(node.props.assign, node.props.type)) {
                accumErr({
                    header: VariableCastLoss(node.props.assign.type, node.props.type.type),
                    ...extractSnippet(
                        variable.startOffset,
                        variable.endOffset || variable.startOffset
                    ),
                    line: variable.startLine || -1,
                    column: variable.startColumn || -1,
                })
            } 
        }

        return node;
    }

    assignment(ctx: AssignmentCtx): ASTNode {
        const vari = ctx.varName[0];
        let node: ASTNode = {
            type: ASTNodeTypes.VARIABLE_ASSIGN,
            props: {
                varname: vari.image,
                assign: null
            }
        }

        if (!this.variables[vari.image]) {
            accumErr({
                header: VariableUndeclared(vari.image),
                ...extractSnippet(
                    vari.startOffset,
                    vari.endOffset || vari.startOffset
                ),
                line: vari.startLine || -1,
                column: vari.startColumn || -1
            })
        } 

        node.props.assign = this.visit(ctx.value[0]); // Process the value being assigned

        if (node.props.assign.type === ASTExpTypes.BAD_TYPE) return node;

        if (!isLosslessCast(node.props.assign, this.variables[vari.image])) {
            accumErr({
                // @ts-ignore
                header: VariableCastLoss(node.props.assign.type, this.variables[vari.image].type),
                ...extractSnippet(
                    vari.startOffset,
                    vari.endOffset || vari.startOffset
                ),
                line: vari.startLine || -1,
                column: vari.startColumn || -1,
            })
        }

        return node;
    }

    exit(ctx: ExitCtx): ASTNode {
        return {
            type: ASTNodeTypes.EXIT,
            props: {
                exitCode: this.visit(ctx.exitCode[0])
            }
        }
    }

    expression(ctx: ExpressionCtx): ASTExpression {
        let exp: ASTExpression = {
            type: ASTExpTypes.BAD_TYPE,
            components: null
        };

        if (ctx.variableRef) {
            const vari = ctx.variableRef[0];
            if (!this.variables[vari.image]) {
                accumErr({
                    header: VariableUndeclared(vari.image),
                    ...extractSnippet(
                        vari.startOffset,
                        vari.endOffset || vari.startOffset
                    ),
                    line: vari.startLine || -1,
                    column: vari.startColumn || -1,
                })
            } else exp = { 
                ...this.variables[vari.image],
                components: { varname: vari.image }
            }
            
        } if (ctx.intLiteral) {
            const converted = Number(ctx.intLiteral[0].image.replace(/[+\-_]/g, ''));
            exp = {
                type: ASTExpTypes.INT,
                size: minBit(converted),
                components: { literal: converted }
            };
        } if (ctx.uintLiteral) {
            const converted = Number(ctx.uintLiteral[0].image.replace(/[u_]/g, ''));
            exp = {
                type: ASTExpTypes.UINT,
                size: minBit(converted),
                components: { literal: converted}
            }
        }

        return exp;
    }
}

function minBit(n: number): number {
    if (n === 0) return 1;
    return Math.floor(Math.log2(n)) + 1;
}

function isLosslessCast(from: ASTExpression, to: ASTExpression): boolean{
    switch(`${from.type}-${to.type}`){
        case `${ASTExpTypes.INT}-${ASTExpTypes.UINT}`:
            return false;

        case `${ASTExpTypes.UINT}-${ASTExpTypes.INT}`:
            return from.size! < to.size!;

        case `${ASTExpTypes.INT}-${ASTExpTypes.INT}`:
        case `${ASTExpTypes.UINT}-${ASTExpTypes.UINT}`:
            return from.size! <= to.size!;

        default: return false;
    }
}

function typeTokenToExpType(token: IToken): ASTExpression{
    const { image } = token;

    let imgRes = image.split("<")
    let exp: any = { components: null };

    if (imgRes.length > 1){
        imgRes[1] = imgRes[1].substring(0, imgRes[1].length-1);
        exp.size = imgRes[1]==='auto' ? -1 : Number(imgRes[1]);
    } else exp.size = 32;
    
    const isValidType = Object.values(ASTExpTypes).includes(imgRes[0]);

    exp.type = isValidType ? imgRes[0] : ASTExpTypes.BAD_TYPE;

    if (!isValidType) accumErr({
        header: InvalidType(imgRes[0]),
        ...extractSnippet(
            token.startOffset,
            token.endOffset || token.startOffset
        ),
        line: token.startLine || -1,
        column: token.endLine || -1
    })

    return exp;
}

const visitor = new KevlarVisitor();

let errors: CompileError[] = [];

function accumErr(e: CompileError){
    errors.push(e);
}

export const KevlarCstToAst = {
    
    build(cst: CstNode[] | CstNode){
        return { errors, ast: visitor.visit(cst) };
    }

} 
