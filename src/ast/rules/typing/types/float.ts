import { TypesCtx } from "@/cst/types";
import CEbuilder from "@/utils/snippet";
import Context from "@/ast/context";
import { InvalidValue, NoFloatPreset, NonStdSize, SizeTooSmall } from "@/ast/errors";
import Helper from "../typehelper";
import { ASTExpTypes } from "@/ast/rules/expression/types";
import { ASTType, FloatTypeProps } from "../tstypes";

const floatPresets: { [key:string]: FloatTypeProps } = {
    '16': { sign: 1, exp: 5, frac: 10 },
    '32': { sign: 1, exp: 8, frac: 23 },
    '64': { sign: 1, exp: 11, frac: 52 },
    '128': { sign: 1, exp: 15, frac: 112 },
}

export default function VisitFloatTypeCtx(ctx: TypesCtx){

    let node: ASTType<FloatTypeProps> = { 
        basetype: ASTExpTypes.FLOAT, 
        display: 'float', 
        props: floatPresets['32']!
    }

    if (ctx.size?.[0]){
        if (ctx.exponent?.[0]) {
            const sign = Number(ctx.size[0].image) as (0 | 1);
            const exp = Number(ctx.exponent[0].image);
            const frac = Number(ctx.fraction![0]!.image);

            if (sign > 1 || sign < 0) {
                Context.errors.push(CEbuilder(InvalidValue('Sign bit', [0, 1], sign), ctx.size[0]));
            }

            if (exp === 0) {
                Context.errors.push(CEbuilder(InvalidValue('Exponent', '0', exp, true), ctx.exponent[0]));
            }

            if (frac === 0) {
                Context.errors.push(CEbuilder(InvalidValue('Fraction', '0', frac, true), ctx.fraction![0]!));
            }

            node.props = { sign, exp, frac }

        } else {
            const size = ctx.size[0].image==='auto' ? '32' : ctx.size[0].image;
            
            const preset = floatPresets[size];

            if (preset) {
                node.props = preset;
            } else {
                Context.errors.push(CEbuilder(NoFloatPreset(size), ctx.size[0]))
            }
        }

    }

    const size = getFloatSize(node.props);

    if (!Helper.isStdSize(size)) {
        Context.warnings.push(CEbuilder(NonStdSize(size), ctx.basetype[0]!));
    }

    node.display = `${node.basetype}<${size}>`;
}

function getFloatSize(float: FloatTypeProps) {
    return float.sign + float.exp + float.frac;
}
