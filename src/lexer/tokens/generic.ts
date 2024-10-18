import { createToken, Lexer } from "chevrotain";

export const Semicolon = createToken({ name: "Semicolon", pattern: /;/ });

export const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z_][a-zA-Z0-9_]*/ });

//  export const Comment = createToken({ 
//      name: "Comment", 
//      pattern: /\/\/.*|\/\*[\s\S]*?\*\//, 
//      group: Lexer.SKIPPED
//  });

export const Whitespace = createToken({
  name: "Whitespace",
  pattern: /\s+/,
  group: Lexer.SKIPPED // Skip whitespace
});
