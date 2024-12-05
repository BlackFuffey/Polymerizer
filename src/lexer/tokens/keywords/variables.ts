import { createToken } from "chevrotain";

export const Constant = createToken({ name: "Constant", pattern: /\bconst\b/ })

export const Int = createToken({ name: "Int", pattern: /\bint\b/ });

export const UnsignedInt = createToken({ name: "UnsignedInt", pattern: /\buint\b/ });

export const Boolean = createToken({ name: "Boolean", pattern: /\bbool\b/ })

export const Float = createToken({ name: "Float", pattern: /\bfloat\b/ })

export const Char = createToken({ name: "Char", pattern: /\bchar\b/ })
