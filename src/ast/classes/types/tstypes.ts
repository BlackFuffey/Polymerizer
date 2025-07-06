import { JsonObject } from "@/tstypes";
import ASTBadType from "./misc/ASTBadType";
import ASTBooleanType from "./primatives/ASTBoolType";
import ASTFloatType from "./primatives/ASTFloatType";
import ASTIntType from "./primatives/ASTIntType";

// Union type of all concrete ASTType implementation
export type ASTConcreteType = ASTBadType | ASTBooleanType | ASTFloatType | ASTIntType;

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
