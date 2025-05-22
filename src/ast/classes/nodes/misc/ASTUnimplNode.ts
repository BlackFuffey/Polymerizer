import ASTNode from "../ASTNode";
import { ASTNodeTypes } from "../tstypes";

export default class ASTUnimplementedNode extends ASTNode<any, any>{
    
    _type = ASTNodeTypes.UNIMPLEMENTED
    _children: any;
    _props: any;

    constructor({ children, props }: { children: any, props: any }) {
        super();
        this._props = props;
        this._children = children;
    }

}
