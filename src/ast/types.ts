export enum ASTNodeTypes {
    PROGRAM                     = "PROGRAM",
    VARIABLE_DECLARE            = "VARIABLE_DECLARE",
    VARIABLE_ASSIGN             = "VARIABLE_ASSIGN",
    IF_ELSE                     = "IF_ElSE",
    EXIT                        = "EXIT",
    PRINT                       = "PRINT",
    UNIMPLEMENTED               = "UNIMPLEMENTED",
}

export enum ASTExpTypes {
    INT                         = "int",
    UINT                        = "uint",
    BOOL                        = "bool",
    FLOAT                       = "float",
    BAD_TYPE                    = 0,
}

export type ASTNode<PropT> = {
    type: ASTNodeTypes;
    props: PropT;
    children?: ASTNode<any>[];
}

export type ASTType<PropT> = {
    basetype: ASTExpTypes;
    props: PropT;
    display: string;
}

export type ASTExpression<CompT> = {
    type: ASTType<any>;
    components: CompT;
}

export type ASTVarProps = {
    varname: string;
    type: ASTType<any>;
    assign?: ASTExpression<any>;
}

export type ASTLitProps = {
    literal: number | boolean | string;
}

export type ASTPrintProps = {
    content: any;
}

export type ASTExitProps = {
    exitCode: ASTExpression<ASTVarProps | ASTLitProps>
}
