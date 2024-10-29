import { CstNode, IToken } from "chevrotain";

// The context type for the `program` rule
export interface ProgramCtx {
    statement: CstNode[]; // Many statements in the program
}

// The context type for the `statement` rule
export interface StatementCtx {
    variableDeclaration?: CstNode[];
    assignment?: CstNode[];
    exit?: CstNode[];
}

// The context type for the `variableDeclaration` rule
export interface VariableDeclarationCtx {
    dataType: IToken[];    // Could be Int or UnsignedInt token
    varName: IToken[];     // Identifier token
    assignOp?: IToken[];   // Optional Assign token
    initialValue?: CstNode[]; // Optional subrule (expression)
    semicolon: IToken[];   // Semicolon token
}

// The context type for the `assignment` rule
export interface AssignmentCtx {
    varName: IToken[];     // Identifier token
    assignOp: IToken[];    // Assign token
    value: CstNode[];      // Subrule (expression)
    semicolon: IToken[];   // Semicolon token
}

// The context type for the `exit` rule
export interface ExitCtx {
    exitKeyword: IToken[]; // Exit token
    exitCode: CstNode[];   // Subrule (expression)
    semicolon: IToken[];   // Semicolon token
}

// The context type for the `expression` rule
export interface ExpressionCtx {
    intLiteral?: IToken[]; // Could be an IntLiteral token
    uintLiteral?: IToken[]; // Could be an UIntLiteral token
    variableRef?: IToken[];  // Could be an Identifier token
}

