import { AssignmentCtx, VariableDeclarationCtx } from "../../cst/types.js";
import Helper from "../Helper.js";
import { KevlarVisitor } from "../Ast.js";
import { ASTExpTypes, ASTNode, ASTNodeTypes, ASTVarProps } from "../types.js";
import { VariableCastLoss, VariableRedeclare, VariableUndeclared } from "../errors.js";
import extractSnippet from "../../utils/snippet.js";
import Context from "../Context.js";

export default function includeVariableASTRules(visitor: KevlarVisitor) {
    // @ts-ignore
    visitor.variableDeclaration = (ctx: VariableDeclarationCtx): ASTNode<ASTVarProps> => {
        const variable = ctx.varName[0];
        let node: ASTNode<ASTVarProps> = {
            type: ASTNodeTypes.VARIABLE_DECLARE,
            props: {
                varname: variable.image,
                type: visitor.visit(ctx.dataType[0]),
            }
        }

        if (Context.variables[variable.image]) {
            Context.errors.push({
                header: VariableRedeclare(variable.image),
                ...extractSnippet(
                    variable.startOffset,
                    variable.endOffset || variable.startOffset
                ),
                line: variable.startLine || -1,
                column: variable.startColumn || -1,
            })
        } else {
            Context.variables[variable.image] = node.props.type;
        }

        if (ctx.initialValue) {
            node.props.assign = visitor.visit(ctx.initialValue[0]); // Process the initial assignment

            if (!Helper.isLosslessCast(node.props.assign!.type, node.props.type)) {
                Context.errors.push({
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

    // @ts-ignore
    visitor.assignment = (ctx: AssignmentCtx): ASTNode<ASTVarProps> => {
        const vari = ctx.varName[0];
        let node: ASTNode<ASTVarProps> = {
            type: ASTNodeTypes.VARIABLE_ASSIGN,
            props: {
                type: Context.variables[vari.image],
                varname: vari.image,
                assign: visitor.visit(ctx.value[0]),
            }
        }

        if (!node.props.type) {
            Context.errors.push({
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

            if (!Helper.isLosslessCast(node.props.assign!.type, node.props.type)) {
                Context.errors.push({
                    header: VariableCastLoss(node.props.assign!.type.display, node.props.type.display),
                    ...extractSnippet(
                        vari.startOffset,
                        vari.endOffset || vari.startOffset
                    ),
                    line: vari.startLine || -1,
                    column: vari.startColumn || -1,
                })
            }

            node.props.type = Context.variables[vari.image];
        }

        return node;
    }
}
