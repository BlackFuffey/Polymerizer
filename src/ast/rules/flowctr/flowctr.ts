import { ExitCtx } from "@/cst/types";
import { KevlarVisitor } from "@/ast/ast";
import { ASTNodeTypes, ASTUnimplNode } from "@/ast/tstypes";
import { ASTExpression, IntLitComps } from "../expression/types";

export type ASTIfElseNode = {
    type: ASTNodeTypes.IF_ELSE
    props: unknown
    children: unknown
} 

export type ASTExitNode = {
    type: ASTNodeTypes.EXIT
    props: {
        exitCode: ASTExpression<ASTVarProps | IntLitComps>
    }
} 

export default function includeFlowControlASTRules(visitor: KevlarVisitor) {
    (visitor as any).exit = (ctx: ExitCtx): ASTExitNode => {
        return {
            type: ASTNodeTypes.EXIT,
            props: {
                exitCode: visitor.visit(ctx.exitCode![0]!)
            }
        }
    }

    (visitor as any).ifElseBlock = (ctx: any): ASTUnimplNode => {
        return {
            type: ASTNodeTypes.UNIMPLEMENTED,
            props: { ctx }
        }
    }

    (visitor as any).scopeBlock = (ctx: any): ASTUnimplNode => {
        return {
            type: ASTNodeTypes.UNIMPLEMENTED,
            props: { ctx }
        }
    }
}
