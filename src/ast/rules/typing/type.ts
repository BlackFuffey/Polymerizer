import { TypesCtx } from "../../../cst/types.js";
import CEbuilder from "../../../utils/snippet.js";
import extractSnippet from "../../../utils/snippet.js";
import { KevlarVisitor } from "../../Ast.js";
import Context from "../../Context.js";
import { InvalidType, NonStdSize, SizeTooSmall } from "../../errors.js";
import Helper from "../../Helper.js";
import { ASTExpTypes, ASTType } from "../../types.js";

export default function includeTypeASTRules(visitor: KevlarVisitor) {
    // @ts-ignore
    visitor.types = (ctx: TypesCtx): ASTType<any> => {
        let type = ctx.basetype[0];
        let exp: ASTType<any> = { basetype: ASTExpTypes.BAD_TYPE, display: '', props: {} };

        const isValidType = Object.values(ASTExpTypes).includes(type.image);

        exp.basetype = isValidType ? type.image as ASTExpTypes : ASTExpTypes.BAD_TYPE;

        if (isValidType) {
            switch (exp.basetype) {
                case ASTExpTypes.INT:
                case ASTExpTypes.UINT:
                    let size;
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
                break;

                case ASTExpTypes.BOOL: exp.display = 'bool'; break;

                default: throw new Error(`Type ${exp.basetype} was not implemented`);
            }

        } else {
            Context.errors.push(CEbuilder(InvalidType(type.image), type));
        }


        return exp;
    }
}
