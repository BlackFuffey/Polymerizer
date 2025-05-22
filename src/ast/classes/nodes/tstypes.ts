import { ASTProgramNode } from "./ASTProgramNode";

export type ASTConcreteNode = ASTProgramNode;

export enum ASTNodeTypes {
    PROGRAM                     = "PROGRAM",
    VARIABLE_DECLARE            = "VARIABLE_DECLARE",
    VARIABLE_ASSIGN             = "VARIABLE_ASSIGN",
    IF_ELSE                     = "IF_ElSE",
    EXIT                        = "EXIT",
    PRINT                       = "PRINT",
    UNIMPLEMENTED               = "UNIMPLEMENTED",
}

export type ASTStaticNode = {
    type: ASTNodeTypes;
    props?: object;
    children?: object[];
}
