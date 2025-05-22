import ASTType from "../ASTType";
import { ASTBaseTypes } from "../tstypes";

export default class ASTBadType extends ASTType<any> {
    protected override readonly _basetype = ASTBaseTypes.BAD_TYPE;
    private _display: string;

    constructor({ props, display }: { props: any, display: string }) {
        super({ props });
        this._display = display;
    }

    public override get display(): string {
        return this._display;
    }

    public override get isValid(): boolean {
        return false;
    }

    public override isCastableTo(type: ASTType<unknown>): boolean {
        return false;
    }
}
