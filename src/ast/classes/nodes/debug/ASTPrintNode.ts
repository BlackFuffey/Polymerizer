import ASTNode from "../ASTNode";
import { ASTNodeTypes } from "../tstypes";

type PrintNodeProps = {
    message: string
}

export default class ASTPrintNode extends ASTNode<PrintNodeProps, never> {
    _type = ASTNodeTypes.PRINT;
    _props: PrintNodeProps;
    _children = undefined as never;

    constructor({ props }: { props: PrintNodeProps }) {
        super();
        this._props = props;
    }
}
