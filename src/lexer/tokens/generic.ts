import { createToken, Lexer } from "chevrotain";

export const Semicolon = createToken({ name: "Semicolon", pattern: /;/ });

export const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z_][a-zA-Z0-9_]*/ });
//export const Newline = createToken({ name: "Newline", pattern: /(?=\s*\n)\s+/ });

export const ScopeStart = createToken({ name: "ScopeStart", pattern: /\{/ })
export const ScopeEnd = createToken({ name: "ScopeEnd", pattern: /\}/ })

export const ExpStart = createToken({ name: "ExpStart", pattern: /\(/ })
export const ExpEnd = createToken({ name: "ExpEnd", pattern: /\)/ })

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
