import { KevlarVisitor } from "../Ast.js";
import { ASTNodeTypes } from "../types.js";

export type ASTPrintProps = {
    content: any;
}

export default function includeDebugASTRules(visitor: KevlarVisitor) {
    // @ts-ignore
    visitor.print = (ctx: PrintCtx): ASTNode<ASTPrintProps> => {
        return {
            type: ASTNodeTypes.PRINT,
            props: {
                content: visitor.visit(ctx.content[0])
            }
        }
    }
}
