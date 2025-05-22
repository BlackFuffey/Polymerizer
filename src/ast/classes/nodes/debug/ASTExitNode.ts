import ASTNode from "../ASTNode";
import { ASTNodeTypes } from "../tstypes";

type ASTExitNodeProps = {
    exitCode: unknown;
}

export default class ASTExitNode extends ASTNode<ASTExitNodeProps, never> {
    _type = ASTNodeTypes.EXIT;
    _props: ASTExitNodeProps;
    _children = undefined as never;

    constructor({ props }: { props: ASTExitNodeProps }) {
        super();
        this._props = props;
    }
}
