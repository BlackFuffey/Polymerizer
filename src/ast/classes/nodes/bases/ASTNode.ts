import { ASTConcreteNode, ASTNodeTypes, ASTStaticNode } from "../tstypes";

type ArrayOrNever<T> = T extends never ? never : T[]

export default abstract class ASTNode<
    PropT extends object, 
    ChildT extends ASTConcreteNode
> {
    protected readonly abstract _type: ASTNodeTypes;

    protected _children: ArrayOrNever<ChildT>;

    protected readonly _props: PropT;

    public constructor({ props, children }: { props: PropT, children: ArrayOrNever<ChildT> }) {
        this._props = Object.freeze(props);
        this._children = children;
    }

    public abstract toStaticObject(): ASTStaticNode;    

    public get type(): ASTNodeTypes {
        return this._type;
    }

    public get props(): PropT {
        return this._props;
    }

    public get children(): ArrayOrNever<ChildT> {
        return this._children;
    }
}
