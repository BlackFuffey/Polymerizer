import { ASTNodeTypes } from "@/ast/tstypes";
import ASTNode from "./ASTNode";
import { ASTConcreteNode, ASTStaticNode } from "./tstypes";

export class ASTProgramNode extends ASTNode<never, ASTConcreteNode> {
    _type = ASTNodeTypes.PROGRAM;
    _props = undefined as never;
    _children: ASTConcreteNode[];
    
    constructor({ children }: { children: ASTConcreteNode[] }) {
        super();
        this._children = children;
    }

    toStaticObject(): ASTStaticNode {
        return {
            type: this._type,
            children: this._children.map(child => child.toStaticObject())
        }
    }
}
