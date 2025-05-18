import { PrintCtx } from "../../cst/types";
import { KevlarVisitor } from "../ast";
import { ASTNode, ASTNodeTypes } from "../tstypes";

export type ASTPrintNode = {
    type: ASTNodeTypes.PRINT
    props: {
        content: any;
    }
} 

export default function includeDebugASTRules(visitor: KevlarVisitor) {
    (visitor as any).print = (ctx: PrintCtx): ASTPrintNode => {
        return {
            type: ASTNodeTypes.PRINT,
            props: {
                content: visitor.visit(ctx.content![0]!)
            }
        }
    }
}
