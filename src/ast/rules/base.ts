import { KevlarVisitor } from "../ast";
import { ProgramCtx, StatementCtx } from "../../cst/types";
import { ASTNode, ASTNodeTypes, ASTProgramNode, ASTStatementNode, ASTUnimplNode } from "../tstypes";

export default function includeBaseASTRules(visitor: KevlarVisitor) {
    (visitor as any).program = (ctx: ProgramCtx): ASTProgramNode => {
        let node: ASTProgramNode = {
            type: ASTNodeTypes.PROGRAM,
            children: []
        };

        ctx.statement.forEach((statementNode) => {
            node.children!.push(visitor.visit(statementNode));
        });

        return node;
    }

    // @ts-ignore
    visitor.statement = (ctx: StatementCtx): ASTStatementNode | ASTUnimplNode => {

        if (ctx.variableDeclaration?.[0]) 
            return visitor.visit(ctx.variableDeclaration[0]);

        if (ctx.assignment?.[0]) 
            return visitor.visit(ctx.assignment[0]);

        if (ctx.exit?.[0]) 
            return visitor.visit(ctx.exit[0]);

        if (ctx.print?.[0])
            return visitor.visit(ctx.print[0]);

        return {
            type: ASTNodeTypes.UNIMPLEMENTED,
            props: JSON.stringify(ctx)
        }
    }

    // @ts-ignore
    visitor.scope = (ctx: any): ASTNode<any> => {
        return {
            type: ASTNodeTypes.UNIMPLEMENTED,
            props: JSON.stringify(ctx)
        }
    }


}
