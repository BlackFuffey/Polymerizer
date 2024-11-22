import { ExitCtx } from "../../../cst/types.js";
import { KevlarVisitor } from "../../Ast.js";
import {  ASTNodeTypes } from "../../types.js";

export default function includeFlowControlASTRules(visitor: KevlarVisitor) {
    // @ts-ignore
    visitor.exit = (ctx: ExitCtx): ASTNode<ASTExpProps> => {
        return {
            type: ASTNodeTypes.EXIT,
            props: {
                exitCode: visitor.visit(ctx.exitCode[0])
            }
        }
    }

    // @ts-ignore
    visitor.ifElseBlock = (ctx: any): ASTNode<any> => {
        return {
            type: ASTNodeTypes.UNIMPLEMENTED,
            props: { ctx }
        }
    }

    // @ts-ignore
    visitor.scopeBlock = (ctx: any): ASTNode<any> => {
        return {
            type: ASTNodeTypes.UNIMPLEMENTED,
            props: { ctx }
        }
    }
}
