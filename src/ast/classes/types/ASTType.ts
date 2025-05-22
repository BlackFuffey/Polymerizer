import { ASTBaseTypes } from "./tstypes";

export default abstract class ASTType<PropT> {
    protected readonly abstract _basetype: ASTBaseTypes;

    protected readonly _props: PropT;

    public constructor({ props }: { props: PropT }) {
        this._props = Object.freeze(props);
    }

    public abstract get display(): string;

    public abstract get isValid(): boolean;

    public abstract isCastableTo(type: ASTType<unknown>): boolean;

    public get basetype(): ASTBaseTypes {
        return this._basetype;
    }

    public get props(): PropT {
        return this._props;
    }
}
