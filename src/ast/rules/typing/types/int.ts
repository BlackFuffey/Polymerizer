import { TypesCtx } from "../../../../cst/types.js";
import CEbuilder from "../../../../utils/snippet.js";
import Context from "../../../Context.js";
import { NonStdSize, SizeTooSmall } from "../../../errors.js";
import { ASTExpTypes } from "../../expression/types.js";
import { ASTType, IntTypeProps } from "../tstypes.js";
import Helper from "../typehelper.js";

export default function visitIntTypeCtx(ctx: TypesCtx) {
    let size;
    let exp: ASTType<IntTypeProps> = {
        basetype: ASTExpTypes.BAD_TYPE,
        display: 'int/uint',
        props: { size: 0 }
    }

    if (ctx.size){
        size = ctx.size[0];

        exp.props.size = size.image==='auto' ? 32 : Number(size.image);

        if (exp.basetype === ASTExpTypes.INT && exp.props.size < 2) {
            Context.errors.push(CEbuilder(SizeTooSmall(ASTExpTypes.INT, exp.props.size, 2), size));
        }

        if (exp.basetype === ASTExpTypes.UINT && exp.props.size < 1) {
            Context.errors.push(CEbuilder(SizeTooSmall(ASTExpTypes.UINT, exp.props.size, 1), size));
        }

    } else exp.props.size = 32;

    if (!Helper.isStdSize(exp.props.size)) {
        Context.warns.push(CEbuilder(NonStdSize(exp.props.size), size!));
    }

    exp.display = `${exp.basetype}<${exp.props.size}>`;

    return exp;

}
