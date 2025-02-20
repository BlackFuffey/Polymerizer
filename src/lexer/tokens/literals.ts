import { createToken } from "chevrotain";

export const IntLiteral = createToken({ name: "IntLiteral", pattern: /-\d(?:_?\d)*/ })

export const UIntLiteral = createToken({ name: "UIntLiteral", pattern: /\+?\d(?:_?\d)*/ })

export const BoolLiteral = createToken({ name: "BoolLiteral", pattern: /\b(true|false)\b/})
