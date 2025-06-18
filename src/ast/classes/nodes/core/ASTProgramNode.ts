import { ASTNodeTypes } from "@/ast/tstypes";
import ASTNode from "../bases/ASTNode";
import { ASTConcreteNode, ASTStaticNode } from "../tstypes";

export class ASTProgramNode extends ASTNode<never, ASTConcreteNode> {
    protected override readonly _type = ASTNodeTypes.PROGRAM;

    public constructor({ children }: { children: ASTConcreteNode[] }) {
        super({
            props: undefined as never,
            children
        })
    }

    public override toStaticObject(): ASTStaticNode {
        return {
            type: this.type,
            props: this.props,
            children: this._children.map(child => child.toStaticObject())
        }
    }
}
