import { TypesCtx } from "@/cst/types";
import CEbuilder from "@/utils/snippet";
import { KevlarVisitor } from "@/ast/ast";
import Context from "@/ast/utils/context";
import { InvalidType, NonStdSize, SizeTooSmall } from "@/ast/utils/errors";
import Helper from "./typehelper";
import { ASTExpTypes } from "../expression/types";
import { ASTType } from "./tstypes";
import VisitFloatTypeCtx from "./types/float";
import visitIntTypeCtx from "./types/int";

export default function includeTypeASTRules(visitor: KevlarVisitor) {
    (visitor as any).types = (ctx: TypesCtx): ASTType<any> => {
        let type = ctx.basetype[0]!;
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
