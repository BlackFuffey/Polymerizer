import { ASTConcreteType } from "../../types/tstypes";
import { ASTStaticExpression } from "../tstypes";

export default abstract class ASTExpression<CompT extends object, TypeT extends ASTConcreteType> {
    protected _type: TypeT;

    protected readonly _components: CompT;

    protected constructor({ components, type }: { components: CompT, type: TypeT }) {
        this._components = components;
        this._type = type;
    }

    public abstract toStaticObject(): ASTStaticExpression

    public get components(): CompT {
        return this._components;
    }

    public get type(): TypeT {
        return this._type;
    }
    
    protected set type(type) {
        this._type = type;
    }
}
