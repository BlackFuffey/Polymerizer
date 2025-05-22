import ASTNode from "../ASTNode";
import { ASTNodeTypes } from "../tstypes";

type ASTVarAssignProps = {
    varname: string;
    assign: unknown;
}

export default class ASTVarAssignNode extends ASTNode<ASTVarAssignProps, never> {
    _type = ASTNodeTypes.VARIABLE_DECLARE;
    _props: ASTVarAssignProps;
    _children = undefined as never;

    constructor({ props }: { props: ASTVarAssignProps }) {
        super();
        this._props = props;
    }

}
