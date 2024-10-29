import { createToken } from "chevrotain";

export const IntLiteral = createToken({ name: "IntLiteral", pattern: /[+-]?\d(?:_?\d)*/ })

export const UIntLiteral = createToken({ name: "UIntLiteral", pattern: /u\d(?:_?\d)*/ })