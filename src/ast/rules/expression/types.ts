import { ASTType } from "../typing/tstypes.js";

export type ASTExpression<CompT> = {
    type: ASTType<any>;
    components: CompT;
}

export type ASTLitProps = {
    literal: number | boolean | string;
}

export enum ASTExpTypes {
    INT                         = "int",
    UINT                        = "uint",
    BOOL                        = "bool",
    FLOAT                       = "float",
    BAD_TYPE                    = 0,
}
