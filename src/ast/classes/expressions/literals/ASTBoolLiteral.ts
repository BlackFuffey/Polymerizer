import ASTBooleanType from "../../types/primatives/ASTBoolType";
import ASTLiteralExpression from "../bases/ASTLiteralExp";

type BoolLiteralComps = {
    literal: {
        value: boolean
    }
}

export default class ASTBooleanLiteral extends ASTLiteralExpression<BoolLiteralComps, ASTBooleanType> {
    public constructor({ value }: { value: boolean }) {
        super({
            components: {
                literal: { value }
            },
            type: new ASTBooleanType({ props: undefined as never })
        })
    }
}
