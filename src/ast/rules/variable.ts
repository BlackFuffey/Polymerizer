import { AssignmentCtx, VariableDeclarationCtx } from "../../cst/types";
import Helper from "./typing/typehelper";
import { KevlarVisitor } from "../ast";
import { ASTNode, ASTNodeTypes } from "../tstypes";
import { VariableCastLoss, VariableRedeclare, VariableUndeclared } from "../errors";
import Context from "../context";
import CEbuilder from "../../utils/snippet";
import { ASTType } from "./typing/tstypes";
import { ASTExpression, ASTExpTypes } from "./expression/types";

type ASTVarProps = {
    varname: string;
    type: ASTType<any>;
    assign?: ASTExpression<any>;
}

export type ASTVarDeclareNode = {
    type: ASTNodeTypes.VARIABLE_DECLARE
    props: ASTVarProps
} 

export type ASTVarAssignNode = {
    type: ASTNodeTypes.VARIABLE_ASSIGN
    props: ASTVarProps
}

export default function includeVariableASTRules(visitor: KevlarVisitor) {
    (visitor as any).variableDeclaration = (ctx: VariableDeclarationCtx): ASTVarDeclareNode => {
        const variable = ctx.varName[0];
        let node: ASTVarDeclareNode = {
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
    visitor.assignment = 
        (ctx: AssignmentCtx): ASTVarAssignNode => {
        const vari = ctx.varName[0]!;
        let node: ASTVarAssignNode = {
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
