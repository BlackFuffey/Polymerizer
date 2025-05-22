import { IToken } from "chevrotain";
import ASTNumericalType from "./ASTNumericalType";
import ASTType from "./ASTType";
import { ASTBaseTypes } from "./tstypes";

type IntTypeProps = {
    size: number;
    signed: boolean;
}

export default class ASTIntType extends ASTNumericalType<IntTypeProps> {
    protected readonly _basetype = ASTBaseTypes.INT;

    public static fromCstToken(token: IToken): ASTIntType | null {
        const match = token.image.match(/^(int|uint)(?:<([0-9]+)>)?$/)

        if (!match) return null;

        const [, basetype, sizeStr ] = match;

        const size = sizeStr ? Number(sizeStr) : 32;

        return new ASTIntType({
            props: {
                size,
                signed: basetype === 'int'
            }
        });
    }

    public override get isValid() {
        return this._props.signed ?
            this._props.size >= 2 :
            this._props.size >= 1;
    }

    public override get isAligned() {
        return ASTNumericalType._isByteAligned(this._props.size);
    }

    public override get display() {
        return `${this._props.signed ? 'int' : 'uint'}<${this._props.size}>`;
    }
    
    public override get bitwidth(): number {
        return this.props.size;
    }

    public override isCastableTo(type: ASTType<unknown>) {
        return this.props.signed ?
            this._isCastableSigned(type) :
            this._isCastableUnsigned(type);
    }

    // isCastableTo implementation for when self is signed
    private _isCastableSigned(type: ASTType<unknown>): boolean {
        switch (type.basetype) {
            case ASTBaseTypes.INT:
                const to = type as ASTIntType;
                return this.props.size <= to.props.size;
            default:
                return false;
        }
    }

    // isCastableTo implementation for when self is unsigned
    private _isCastableUnsigned(type: ASTType<unknown>): boolean {
        switch (type.basetype) {
case ASTBaseTypes.INT:
                const to = type as ASTIntType;
                return this.props.size < to.props.size;
            default:
                return false;
        }
    }
}
