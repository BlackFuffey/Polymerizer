import { ExpressionCtx } from "../../../../cst/types.js";
import { FloatTypeProps, IntTypeProps } from "../../typing/tstypes.js";
import Helper from "../../typing/typehelper.js";
import { ASTExpression, ASTExpTypes, BoolLitComps, FloatLitComps, IntLitComps } from "../types.js";

export function visitIntLiteralCtx(ctx: ExpressionCtx): ASTExpression<IntLitComps,IntTypeProps> {

    let exp: ASTExpression<IntLitComps,IntTypeProps> = {
        type: {
            basetype: ASTExpTypes.BAD_TYPE,
            display: 'int/uint',
            props: {
                size: 0
            }
        },
        components: {
            literal: 0
        }
    }

    if (ctx.intLiteral) {
        exp.components.literal = Number(ctx.intLiteral[0].image.replace(/_/g, ''));
        exp.type.props.size = Helper.minBit(exp.components.literal) + 1;
        exp.type.basetype = ASTExpTypes.INT
    } 

    if (ctx.uintLiteral) {
        exp.components.literal = Number(ctx.uintLiteral[0].image.replace(/[+_]/g, ''));
        exp.type.props.size = Helper.minBit(exp.components.literal);
        exp.type.basetype = ASTExpTypes.UINT
    }

    exp.type.display = `${exp.type.basetype}<${exp.type.props.size}>`

    return exp;
}

export function visitBoolLiteralCtx(ctx: ExpressionCtx): ASTExpression<BoolLitComps,undefined> {
    return {
        type: {
            basetype: ASTExpTypes.BOOL,
            display: ASTExpTypes.BOOL.toString(),
            props: undefined,
        },
        components: {
            literal: ctx.boolLiteral![0].image === 'true'
        }
    }
}

export function visitFloatLiteralCtx(ctx: ExpressionCtx) {
    let exp: ASTExpression<FloatLitComps, FloatTypeProps> = {
        type: {
            basetype: ASTExpTypes.FLOAT,
            display: 'float',
            props: {
                sign: 0,
                exp: 0,
                frac: 0
            }
        },
        components: {
            literal: {
                sign: 0,
                exp: 0,
                frac: 0
            }
        }
    }
}
