import { Identifier, EndOfStatement, Whitespace, ScopeStart, ScopeEnd, ExpStart, ExpEnd } from "./tokens/generic.js";
import { Exit, If, Else } from "./tokens/keywords/flowctrl.js";
import { Boolean, Int, UnsignedInt } from "./tokens/keywords/variables.js";
import { BoolLiteral, IntLiteral, UIntLiteral } from "./tokens/literals.js";
import { Assign } from "./tokens/operators/variables.js";

export const asArray = [
    Int, UnsignedInt, Boolean,
    If, Else, Exit, 
    ScopeStart, ScopeEnd, ExpStart, ExpEnd,
    Assign, 
    IntLiteral, UIntLiteral, BoolLiteral,
    EndOfStatement, 
    Identifier, 
    Whitespace
];

export default {
    Int, UnsignedInt, Boolean,
    If, Else, Exit, 
    ScopeStart, ScopeEnd, ExpStart, ExpEnd,
    Assign, 
    IntLiteral, UIntLiteral, BoolLiteral,
    EndOfStatement, 
    Identifier, 
    Whitespace
};
