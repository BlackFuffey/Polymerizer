import { JsonObject } from "@/tstypes";

// Union type of all concrete ASTType implementation
export type ASTConcreteType = unknown;

export enum ASTBaseTypes {
    INT                         = "int",
    BOOL                        = "bool",
    FLOAT                       = "float",
    BAD_TYPE                    = 0,
}

export type ASTStaticType = {
    basetype: ASTBaseTypes;
    display: string;
    props: JsonObject;
}
