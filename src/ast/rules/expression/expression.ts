import { ExpressionCtx } from "@/cst/types";
import CEbuilder from "@/utils/snippet";
import { KevlarVisitor } from "@/ast/ast";
import Context from "@/ast/utils/context";
import { VariableUndeclared } from "@/ast/utils/errors";
import { visitBoolLiteralCtx, visitFloatLiteralCtx, visitIntLiteralCtx } from "./literals/literals";
import { ASTExpression, ASTExpTypes } from "./types";

export default function includeExpressionASTRules(visitor: KevlarVisitor) {

    // @ts-ignore
    visitor.expression = (ctx: ExpressionCtx): ASTExpression<any> => {

        if (ctx.variableRef?.[0]) {
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
