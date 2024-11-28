import { Identifier, Semicolon, Whitespace, ScopeStart, ScopeEnd, ExpStart, ExpEnd, } from "./tokens/generic.js";
import { Print } from "./tokens/keywords/debug.js";
import { Exit, If, Else } from "./tokens/keywords/flowctrl.js";
import { Boolean, Int, UnsignedInt } from "./tokens/keywords/variables.js";
import { BoolLiteral, IntLiteral, UIntLiteral } from "./tokens/literals.js";
import { Assign } from "./tokens/operators/variables.js";

export const asArray = [
    Int, UnsignedInt, Boolean,
    If, Else, Exit, Print,
    ScopeStart, ScopeEnd, ExpStart, ExpEnd,
    Assign, 
    IntLiteral, UIntLiteral, BoolLiteral,
    Semicolon,
    Identifier, 
    Whitespace
];

export default {
    Int, UnsignedInt, Boolean,
    If, Else, Exit, Print,
    ScopeStart, ScopeEnd, ExpStart, ExpEnd,
    Assign, 
    IntLiteral, UIntLiteral, BoolLiteral,
    Semicolon,
    Identifier, 
    Whitespace
};
