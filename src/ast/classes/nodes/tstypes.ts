import { JsonObject } from "@/tstypes";
import { ASTProgramNode } from "./core/ASTProgramNode";
import ASTExitNode from "./debug/ASTExitNode";
import ASTPrintNode from "./debug/ASTPrintNode";
import ASTVarAssignNode from "./var/ASTVarAssignNode";
import ASTVarDeclareNode from "./var/ASTVarDeclareNode";
import ASTUnimplementedNode from "./misc/ASTUnimplNode";

export type ASTConcreteNode = (
    ASTProgramNode |                            // core
    ASTExitNode | ASTPrintNode |                // debug
    ASTUnimplementedNode |                      // misc
    ASTVarAssignNode | ASTVarDeclareNode        // var
);

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
    props?: JsonObject;
    children?: ASTStaticNode[];
}
