import ASTNode from "../ASTNode";
import { ASTNodeTypes } from "../tstypes";

type ASTVarDeclareProps = {
    varname: string;
    type: unknown;
    assign?: unknown;
}

export default class ASTVarDeclareNode extends ASTNode<ASTVarDeclareProps, never> {
    _type = ASTNodeTypes.VARIABLE_DECLARE;
    _props: ASTVarDeclareProps;
    _children = undefined as never;

    constructor({ props }: { props: ASTVarDeclareProps }) {
        super();
        this._props = props;
    }

}
