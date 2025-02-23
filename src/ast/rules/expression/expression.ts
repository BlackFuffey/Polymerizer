import { ExpressionCtx } from "../../../cst/types.js";
import CEbuilder from "../../../utils/snippet.js";
import { KevlarVisitor } from "../../Ast.js";
import Context from "../../Context.js";
import { VariableUndeclared } from "../../errors.js";
import { visitBoolLiteralCtx, visitFloatLiteralCtx, visitIntLiteralCtx } from "./literals/literals.js";
import { ASTExpression, ASTExpTypes } from "./types.js";

export default function includeExpressionASTRules(visitor: KevlarVisitor) {

    // @ts-ignore
    visitor.expression = (ctx: ExpressionCtx): ASTExpression<any> => {

        if (ctx.variableRef) {
            const varname = ctx.variableRef[0];
            if (!Context.variables[varname.image]) {
                Context.errors.push(CEbuilder(VariableUndeclared(varname.image), varname));
            } else return { 
                type: Context.variables[varname.image],
                components: { varname: varname.image },
            }
            
        } 

        if (ctx.boolLiteral) {
            return visitBoolLiteralCtx(ctx);
        }

        if (ctx.uintLiteral || ctx.intLiteral){
            return visitIntLiteralCtx(ctx);
        }

        if (ctx.floatLiteral) {
            return visitFloatLiteralCtx(ctx);
        }

        return {
            type: {
                basetype: ASTExpTypes.BAD_TYPE,
                display: 'unimplemented',
                props: undefined
            },
            components: undefined
        };

    }

}
