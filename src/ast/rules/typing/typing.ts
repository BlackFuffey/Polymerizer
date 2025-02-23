import { TypesCtx } from "../../../cst/types.js";
import CEbuilder from "../../../utils/snippet.js";
import { KevlarVisitor } from "../../Ast.js";
import Context from "../../Context.js";
import { InvalidType, NonStdSize, SizeTooSmall } from "../../errors.js";
import Helper from "./typehelper.js";
import { ASTExpTypes } from "../expression/types.js";
import { ASTType } from "./tstypes.js";
import VisitFloatTypeCtx from "./types/float.js";
import visitIntTypeCtx from "./types/int.js";

export default function includeTypeASTRules(visitor: KevlarVisitor) {
    // @ts-ignore
    visitor.types = (ctx: TypesCtx): ASTType<any> => {
        let type = ctx.basetype[0];
        let exp: ASTType<undefined> = { basetype: ASTExpTypes.BAD_TYPE, display: '', props: undefined };

        const isValidType = Object.values(ASTExpTypes).includes(type.image);

        exp.basetype = isValidType ? type.image as ASTExpTypes : ASTExpTypes.BAD_TYPE;

        if (isValidType) {
            switch (exp.basetype) {
                case ASTExpTypes.INT:
                case ASTExpTypes.UINT:
                    visitIntTypeCtx(ctx);
                break;

                case ASTExpTypes.BOOL: exp.display = 'bool'; break;

                case ASTExpTypes.FLOAT: 
                    VisitFloatTypeCtx(ctx);
                break;

                default: throw new Error(`Type ${exp.basetype} was not implemented`);
            }

        } else {
            Context.errors.push(CEbuilder(InvalidType(type.image), type));
        }


        return exp;
    }
}
