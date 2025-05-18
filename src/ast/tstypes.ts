import { ASTPrintNode } from "./rules/debug";
import { ASTExitNode, ASTIfElseNode } from "./rules/flowctr/flowctr";
import { ASTVarAssignNode, ASTVarDeclareNode } from "./rules/variable";

export enum ASTNodeTypes {
    PROGRAM                     = "PROGRAM",
    VARIABLE_DECLARE            = "VARIABLE_DECLARE",
    VARIABLE_ASSIGN             = "VARIABLE_ASSIGN",
    IF_ELSE                     = "IF_ElSE",
    EXIT                        = "EXIT",
    PRINT                       = "PRINT",
    UNIMPLEMENTED               = "UNIMPLEMENTED",
}

export type ASTNode = ASTProgramNode |
    ASTStatementNode |
    ASTIfElseNode | ASTUnimplNode

export type ASTProgramNode = {
    type: ASTNodeTypes.PROGRAM
    children: ASTNode[]
} 

export type ASTStatementNode = ASTVarDeclareNode |
    ASTVarAssignNode | ASTExitNode | ASTPrintNode

export type ASTUnimplNode = {
    type: ASTNodeTypes.UNIMPLEMENTED
    props?: any
    children?: any
}
