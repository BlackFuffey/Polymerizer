import ASTNode from "../bases/ASTNode";
import { ASTNodeTypes, ASTStaticNode } from "../tstypes";

type ASTVarDeclareProps = {
    varname: string;
    type: unknown;
    assign?: unknown;
}

export default class ASTVarDeclareNode extends ASTNode<ASTVarDeclareProps, never> {
    _type = ASTNodeTypes.VARIABLE_DECLARE;

    public constructor({ props }: { props: ASTVarDeclareProps }) {
        super({ props, children: undefined as never });
    }
}
