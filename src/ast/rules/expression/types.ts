import { ASTType } from "../typing/tstypes.js";

export type ASTExpression<CompT, TypeT> = {
    type: ASTType<TypeT>;
    components: CompT;
}

export type IntLiteral = {
    literal: number
}

export type BoolLitComps = {
    literal: boolean
}

export type FloatLitComps = {
    literal: {
        sign: 0 | 1;
        frac: number;
        exp: number;
    }
}

export enum ASTExpTypes {
    INT                         = "int",
    UINT                        = "uint",
    BOOL                        = "bool",
    FLOAT                       = "float",
    BAD_TYPE                    = 0,
}
