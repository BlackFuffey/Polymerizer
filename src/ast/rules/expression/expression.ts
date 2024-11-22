import { ExpressionCtx } from "../../../cst/types.js";
import extractSnippet from "../../../utils/snippet.js";
import { KevlarVisitor } from "../../Ast.js";
import Context from "../../Context.js";
import { VariableUndeclared } from "../../errors.js";
import Helper from "../../Helper.js";
import { ASTExpression, ASTExpTypes } from "../../types.js";

export default function includeExpressionASTRules(visitor: KevlarVisitor) {

    // @ts-ignore
    visitor.expression = (ctx: ExpressionCtx): ASTExpression<any> => {
        let exp: ASTExpression<any> = {
            type: { basetype: ASTExpTypes.BAD_TYPE, display: '', props: null },
            components: null,
        };

        if (ctx.variableRef) {
            const vari = ctx.variableRef[0];
            if (!Context.variables[vari.image]) {
                Context.errors.push({
                    header: VariableUndeclared(vari.image),
                    ...extractSnippet(
                        vari.startOffset,
                        vari.endOffset || vari.startOffset
                    ),
                    line: vari.startLine || -1,
                    column: vari.startColumn || -1,
                })
            } else exp = { 
                type: Context.variables[vari.image],
                components: { varname: vari.image },
            }
            
        } 
        
        let converted: any = undefined;
        let size: number = -1;
        let type: ASTExpTypes|undefined = undefined;

        if (ctx.intLiteral) {
            converted = Number(ctx.intLiteral[0].image.replace(/[+_]/g, ''));
            size = Helper.minBit(converted) + 1;
            type = ASTExpTypes.INT
        } 

        if (ctx.uintLiteral) {
            converted = Number(ctx.uintLiteral[0].image.replace(/[u_]/g, ''));
            size = Helper.minBit(converted);
            type = ASTExpTypes.UINT
        }

        if (ctx.boolLiteral) {
            exp = {
                type: {
                    basetype: ASTExpTypes.BOOL,
                    props: undefined,
                    display: `${ASTExpTypes.BOOL}`
                },
                components: { literal: ctx.boolLiteral[0].image === 'true' }
            }
        }

        if (ctx.uintLiteral || ctx.intLiteral){
            exp = {
                type: {
                    basetype: type!,
                    props: { size },
                    display: `${type}<${size}>`
                },
                components: { literal: converted }
            }
        }

        return exp;
    }

}
