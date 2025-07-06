import ASTExpression from "../../expressions/bases/ASTExpression";
import ASTIntType from "../../types/primatives/ASTIntType";
import ASTNode from "../bases/ASTNode";
import { ASTNodeTypes, ASTStaticNode } from "../tstypes";

type ASTExitNodeProps = {
    exitCode: ASTExpression<object, ASTIntType>;
}

export default class ASTExitNode extends ASTNode<ASTExitNodeProps, never> {
    protected override readonly _type = ASTNodeTypes.EXIT;

    constructor({ props }: { props: ASTExitNodeProps }) {
        super({ props, children: undefined as never });
    }

    public override toStaticObject(): ASTStaticNode {
        return {
            type: this.type,
            props: {
                exitCode: this.props.exitCode.toStaticObject()
            }
        }
    }
}
