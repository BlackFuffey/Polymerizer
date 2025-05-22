import { ASTExpTypes } from "../expression/types.js";

export type ASTType<PropT> = {
    basetype: ASTExpTypes;
    props: PropT;
    display: string;
}

export type ASTIntType = {
    basetype: ASTExpTypes.
}

export type FloatTypeProps = {
    sign: 0 | 1,
    exp: number,
    frac: number,
}

export type IntTypeProps = {
    size: number
}
