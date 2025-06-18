import { JsonObject } from "@/tstypes";
import ASTNode from "../bases/ASTNode";
import { ASTNodeTypes, ASTStaticNode } from "../tstypes";

export default class ASTUnimplementedNode extends ASTNode<JsonObject, never>{
    
    protected override readonly _type = ASTNodeTypes.UNIMPLEMENTED

    constructor({ props }: { props: JsonObject }) {
        super({ props, children: undefined as never  });
    }

    public override toStaticObject(): ASTStaticNode {
        return {
            type: this.type,
            props: this.props
        }
    }

}
