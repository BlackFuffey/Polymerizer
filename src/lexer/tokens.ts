import { Identifier, Semicolon, Whitespace } from "./tokens/generic.js";
import { Exit } from "./tokens/keywords/flowctrl.js";
import { Int, UnsignedInt } from "./tokens/keywords/variables.js";
import { IntLiteral } from "./tokens/literals.js";
import { Assign } from "./tokens/operators/variables.js";

export const asArray = [Int, UnsignedInt, Exit, Assign, IntLiteral, Semicolon, Identifier, Whitespace];
export default {Int, UnsignedInt, Exit, Assign, IntLiteral, Semicolon, Identifier, Whitespace};
