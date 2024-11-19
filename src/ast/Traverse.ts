import { KevlarVisitorBase, KevlarDefaultVisitorBase } from "../cst/Cst.js";
import {
    StatementCtx,
    VariableDeclarationCtx,
    ProgramCtx,
    ExitCtx,
    AssignmentCtx,
    ExpressionCtx,
} from "../cst/types.js";
import {
    ASTNode,
    ASTNodeTypes,
    ASTExpression,
    ASTExpTypes,
    ASTType,
    ASTVarProps,
    ASTExitProps,
} from "./types.js"
import { CompileError } from "../types.js";
import extractSnippet from "../utils/snippet.js";
import { CstNode, IToken } from "chevrotain";
import { InvalidType, VariableCastLoss, VariableRedeclare, VariableUndeclared } from "../cst/errors.js";

class KevlarVisitor extends KevlarVisitorBase {

    private variables: {
        [key: string]: ASTType<any>;
    }

    constructor() {
        super();
        this.validateVisitor();
        this.variables = {};
    }    

    program(ctx: ProgramCtx): ASTNode<undefined> {
        let ast: ASTNode<undefined> = {
            type: ASTNodeTypes.PROGRAM,
            props: undefined,
            children: []
        };

        ctx.statement.forEach((statementNode) => {
            ast.children!.push(this.visit(statementNode));
        });

        return ast;
    }

    statement(ctx: StatementCtx): ASTNode<any> {
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
            props: undefined
        }
    }

    scope(ctx: StatementCtx): ASTNode<any> {
        return {
            type: ASTNodeTypes.UNIMPLEMENTED,
            props: undefined
        }
    }

    ifElseBlock(ctx: StatementCtx): ASTNode<any> {
        return {
            type: ASTNodeTypes.UNIMPLEMENTED,
            props: undefined
        }
    }

    scopeBlock(ctx: StatementCtx): ASTNode<any> {
        return {
            type: ASTNodeTypes.UNIMPLEMENTED,
            props: undefined
        }
    }

    variableDeclaration(ctx: VariableDeclarationCtx): ASTNode<ASTVarProps> {
        const variable = ctx.varName[0];
        let node: ASTNode<ASTVarProps> = {
            type: ASTNodeTypes.VARIABLE_DECLARE,
            props: {
                varname: variable.image,
                type: typeTokenToASTType(ctx.dataType[0]),
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
            this.variables[variable.image] = typeTokenToASTType(ctx.dataType[0]);
        }

        if (ctx.initialValue) {
            node.props.assign = this.visit(ctx.initialValue[0]); // Process the initial assignment

            if (!isLosslessCast(node.props.assign!.type, node.props.type)) {
                accumErr({
                    header: VariableCastLoss(node.props.assign!.type.display, node.props.type.display),
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

    assignment(ctx: AssignmentCtx): ASTNode<ASTVarProps> {
        const vari = ctx.varName[0];
        let node: ASTNode<ASTVarProps> = {
            type: ASTNodeTypes.VARIABLE_ASSIGN,
            props: {
                type: this.variables[vari.image],
                varname: vari.image,
                assign: this.visit(ctx.value[0]),
            }
        }

        if (!node.props.type) {
            accumErr({
                header: VariableUndeclared(vari.image),
                ...extractSnippet(
                    vari.startOffset,
                    vari.endOffset || vari.startOffset
                ),
                line: vari.startLine || -1,
                column: vari.startColumn || -1
            })
        } else {
            if (node.props.assign!.type.basetype === ASTExpTypes.BAD_TYPE) return node;

            if (!isLosslessCast(node.props.assign!.type, node.props.type)) {
                accumErr({
                    header: VariableCastLoss(node.props.assign!.type.display, node.props.type.display),
                    ...extractSnippet(
                        vari.startOffset,
                        vari.endOffset || vari.startOffset
                    ),
                    line: vari.startLine || -1,
                    column: vari.startColumn || -1,
                })
            }

            node.props.type = this.variables[vari.image];
        }

        return node;
    }

    exit(ctx: ExitCtx): ASTNode<ASTExitProps> {
        return {
            type: ASTNodeTypes.EXIT,
            props: {
                exitCode: this.visit(ctx.exitCode[0])
            }
        }
    }

    expression(ctx: ExpressionCtx): ASTExpression<any> {
        let exp: ASTExpression<any> = {
            type: { basetype: ASTExpTypes.BAD_TYPE, display: '', props: null },
            components: null,
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
                type: this.variables[vari.image],
                components: { varname: vari.image },
            }
            
        } 
        
        let converted: any = undefined;
        let size: number = -1;
        let type: ASTExpTypes|undefined = undefined;

        if (ctx.intLiteral) {
            converted = Number(ctx.intLiteral[0].image.replace(/[+_]/g, ''));
            size = minBit(converted) + 1;
            type = ASTExpTypes.INT
        } 

        if (ctx.uintLiteral) {
            converted = Number(ctx.uintLiteral[0].image.replace(/[u_]/g, ''));
            size = minBit(converted);
            type = ASTExpTypes.UINT
        }

        if (ctx.uintLiteral || ctx.intLiteral){
            exp = {
                type: {
                    basetype: ASTExpTypes.UINT,
                    props: { size },
                    display: `${ASTExpTypes.UINT}<${size}>`
                },
                components: { literal: converted }
            }
        }

        return exp;
    }
}

function minBit(n: number): number {
    if (n === 0) return 1;
    return Math.floor(Math.log2(Math.abs(n))) + 1;
}

function isLosslessCast(from: ASTType<any>, to: ASTType<any>): boolean{
    switch(`${from.basetype}-${to.basetype}`){
        case `${ASTExpTypes.INT}-${ASTExpTypes.UINT}`:
            return false;

        case `${ASTExpTypes.UINT}-${ASTExpTypes.INT}`:
            return from.props.size! < to.props.size!;

        case `${ASTExpTypes.INT}-${ASTExpTypes.INT}`:
        case `${ASTExpTypes.UINT}-${ASTExpTypes.UINT}`:
            return from.props.size! <= to.props.size!;

        default: return false;
    }
}

function typeTokenToASTType(token: IToken): ASTType<any>{
    const { image } = token;

    let imgRes = image.split("<")
    let exp: ASTType<any> = { basetype: ASTExpTypes.BAD_TYPE, display: '', props: {} };

    const isValidType = Object.values(ASTExpTypes).includes(imgRes[0]);

    // @ts-ignore       isValidType ensures imgRes[0] to be a valid ASTExpTypes member
    exp.basetype = isValidType ? imgRes[0] : ASTExpTypes.BAD_TYPE;

    if (isValidType) {
        switch (exp.basetype) {
            case ASTExpTypes.INT:
            case ASTExpTypes.UINT:
                if (imgRes.length > 1){

                    imgRes[1] = imgRes[1].substring(0, imgRes[1].length-1);
                    exp.props.size = imgRes[1]==='auto' ? -1 : Number(imgRes[1]);

                } else exp.props.size = 32;

                exp.display = `${exp.basetype}<${exp.props.size}>`;
                break;
        }

    } else accumErr({
        header: InvalidType(image),
        ...extractSnippet(
            token.startOffset,
            token.endOffset || token.startOffset
        ),
        line: token.startLine || -1,
        column: token.endLine || -1
    }); 


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
