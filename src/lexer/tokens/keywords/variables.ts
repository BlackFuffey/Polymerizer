import { createToken } from "chevrotain";

export const Int = createToken({ name: "Int", pattern: /\bint(?:\<(\d+|auto)\>)?/ });
export const UnsignedInt = createToken({ name: "UnsignedInt", pattern: /\buint(?:\<(\d+|auto)\>)?/ });

