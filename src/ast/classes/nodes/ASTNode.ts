import { ASTConcreteNode, ASTNodeTypes, ASTStaticNode } from "./tstypes";

type ArrayOrNever<T> = T extends never ? never : T[]

export default abstract class ASTNode<
    PropT extends object = never, 
    ChildT extends ASTConcreteNode = never
> {
    protected abstract _type: ASTNodeTypes;

    protected abstract _props: PropT;

    protected abstract _children: ArrayOrNever<ChildT>;

    abstract toStaticObject(): ASTStaticNode;    

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
