import ASTNode from "../bases/ASTNode";
import { ASTNodeTypes, ASTStaticNode } from "../tstypes";

type ASTVarAssignProps = {
    varname: string;
    assign: unknown;
}

export default class ASTVarAssignNode extends ASTNode<ASTVarAssignProps, never> {
    protected override readonly _type = ASTNodeTypes.VARIABLE_DECLARE;

    public constructor({ props }: { props: ASTVarAssignProps }) {
        super({
            props,
            children: undefined as never
        });
    }
}
