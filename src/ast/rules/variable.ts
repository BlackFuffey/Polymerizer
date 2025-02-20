import { AssignmentCtx, VariableDeclarationCtx } from "../../cst/types.js";
import Helper from "./typing/typehelper.js";
import { KevlarVisitor } from "../Ast.js";
import { ASTNode, ASTNodeTypes } from "../types.js";
import { VariableCastLoss, VariableRedeclare, VariableUndeclared } from "../errors.js";
import Context from "../Context.js";
import CEbuilder from "../../utils/snippet.js";
import { ASTType } from "./typing/tstypes.js";
import { ASTExpression, ASTExpTypes } from "./expression/types.js";

export type ASTVarProps = {
    varname: string;
    type: ASTType<any>;
    assign?: ASTExpression<any>;
}

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
            Context.errors.push(CEbuilder(VariableRedeclare(variable.image), variable))
        } else {
            Context.variables[variable.image] = node.props.type;
        }

        if (ctx.initialValue) {
            node.props.assign = visitor.visit(ctx.initialValue[0]); // Process the initial assignment

            if (!Helper.isLosslessCast(node.props.assign!.type, node.props.type)) {
                Context.errors.push(CEbuilder(VariableCastLoss(node.props.assign!.type.display, node.props.type.display), variable));
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
            Context.errors.push(CEbuilder(VariableUndeclared(vari.image), vari))
        } else {
            if (node.props.assign!.type.basetype === ASTExpTypes.BAD_TYPE) return node;

            if (!Helper.isLosslessCast(node.props.assign!.type, node.props.type)) {
                Context.errors.push(CEbuilder(VariableCastLoss(node.props.assign!.type.display, node.props.type.display), vari));
            }

            node.props.type = Context.variables[vari.image];
        }

        return node;
    }
}
