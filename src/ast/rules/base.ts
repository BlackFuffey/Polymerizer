import { KevlarVisitor } from "../Ast.js";
import { ProgramCtx, StatementCtx } from "../../cst/types.js";
import { ASTNode, ASTNodeTypes } from "../types.js";

export default function includeBaseASTRules(visitor: KevlarVisitor) {
    // @ts-ignore
    visitor.program = (ctx: ProgramCtx): ASTNode<undefined> => {
        let ast: ASTNode<undefined> = {
            type: ASTNodeTypes.PROGRAM,
            props: undefined,
            children: []
        };

        ctx.statement.forEach((statementNode) => {
            ast.children!.push(visitor.visit(statementNode));
        });

        return ast;
    }

    // @ts-ignore
    visitor.statement = (ctx: StatementCtx): ASTNode<any> => {

        if (ctx.variableDeclaration) 
            return visitor.visit(ctx.variableDeclaration[0]);

        if (ctx.assignment) 
            return visitor.visit(ctx.assignment[0]);

        if (ctx.exit) 
            return visitor.visit(ctx.exit[0]);

        if (ctx.print)
            return visitor.visit(ctx.print[0]);

        return {
            type: ASTNodeTypes.UNIMPLEMENTED,
            props: undefined
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
