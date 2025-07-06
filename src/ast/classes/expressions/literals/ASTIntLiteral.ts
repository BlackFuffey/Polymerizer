import ASTHelper from "@/ast/utils/helper";
import ASTIntType from "../../types/primatives/ASTIntType";
import ASTLiteralExpression from "../bases/ASTLiteralExp";
import ASTBadType from "../../types/misc/ASTBadType";

type IntLiteralComps = {
    literal: {
        sign: boolean;
        value: number;
    }
}

export default class ASTIntLiteral extends ASTLiteralExpression<IntLiteralComps, ASTIntType | ASTBadType> {

    public constructor({ sign, value }: { sign: boolean, value: number }) {
        if (value < 0 || value % 1 !== 0) {
            super({
                components: {
                    literal: { sign, value }
                }, 
                type: new ASTBadType({ 
                    props: {
        }
                })
            })
        }


        super({
            components: {
                literal: { sign, value }
            },
            type: new ASTIntType({ 
                props: {
                    signed: !sign,
                    size: ASTHelper.minBits(value)
                }
            })
        });
    }
}
