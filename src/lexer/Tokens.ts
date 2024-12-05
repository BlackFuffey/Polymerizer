import { Identifier, Semicolon, Whitespace, ScopeStart, ScopeEnd, ExpStart, ExpEnd, TypeStart, TypeEnd, Separator, } from "./tokens/generic.js";
import { Print } from "./tokens/keywords/debug.js";
import { Exit, If, Else } from "./tokens/keywords/flowctrl.js";
import { Boolean, Char, Float, Int, UnsignedInt } from "./tokens/keywords/variables.js";
import { BoolLiteral, IntLiteral, UIntLiteral } from "./tokens/literals.js";
import { Assign } from "./tokens/operators/variables.js";

export const asArray = [
    Int, UnsignedInt, Boolean, Char, Float,
    If, Else, Exit, Print,
    ScopeStart, ScopeEnd, ExpStart, ExpEnd, TypeStart, TypeEnd, Separator,
    Assign, 
    IntLiteral, UIntLiteral, BoolLiteral,
    Semicolon,
    Identifier, 
    Whitespace
];

export default {
    Int, UnsignedInt, Boolean, Char, Float,
    If, Else, Exit, Print,
    ScopeStart, ScopeEnd, ExpStart, ExpEnd, TypeStart, TypeEnd, Separator,
    Assign, 
    IntLiteral, UIntLiteral, BoolLiteral,
    Semicolon,
    Identifier, 
    Whitespace
};

