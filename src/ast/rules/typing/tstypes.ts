import { ASTExpTypes } from "../expression/types.js";

export type ASTType<PropT> = {
    basetype: ASTExpTypes;
    props: PropT;
    display: string;
}

export type FloatTypeProps = {
    sign: number,
    exp: number,
    frac: number,
}

export type IntTypeProps = {
    size: number
}
