import { JsonValue } from "@/tstypes";
import ASTType from "../bases/ASTType";
import { ASTBaseTypes, ASTStaticType } from "../tstypes";

type BadTypeProps = {
    reason: string,
    debuginfo?: JsonValue
}

export default class ASTBadType extends ASTType<BadTypeProps> {
    protected override readonly _basetype = ASTBaseTypes.BAD_TYPE;

    constructor({ props }: { props: BadTypeProps }) {
        super({ props });
    }

    public override get display(): string {
        return '';
    }

    public override get isValid(): boolean {
        return false;
    }

    public override isCastableTo(): boolean {
        return false;
    }

    public override toStaticObject(): ASTStaticType {
        return {
            props: this.props,
            display: this.display,
            basetype: this.basetype
        }
    }
}
