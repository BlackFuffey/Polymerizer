
export enum ASTNodeTypes {
    PROGRAM                     = "PROGRAM",
    VARIABLE_DECLARE            = "VARIABLE_DECLARE",
    VARIABLE_ASSIGN             = "VARIABLE_ASSIGN",
    IF_ELSE                     = "IF_ElSE",
    EXIT                        = "EXIT",
    PRINT                       = "PRINT",
    UNIMPLEMENTED               = "UNIMPLEMENTED",
}

export type ASTNode<PropT> = {
    type: ASTNodeTypes;
    props: PropT;
    children?: ASTNode<any>[];
}



