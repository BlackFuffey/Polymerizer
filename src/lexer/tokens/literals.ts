import { createToken } from "chevrotain";

export const IntLiteral = createToken({ name: "IntLiteral", pattern: /[+-]?\d(?:_?\d)*/ })

