import { createToken, Lexer } from "chevrotain";

/*      Generic       */
const NumberLiteral = createToken({ name: "NumberLiteral", pattern: /\d+/ });

/*      Ignored     */
const Comment = createToken({ 
    name: "Comment", 
    pattern: /\/\/.*|\/\*[\s\S]*?\*\//, 
    group: Lexer.SKIPPED
});
const Whitespace = createToken({
  name: "Whitespace",
  pattern: /\s+/,
  group: Lexer.SKIPPED // Skip whitespace
});

/*      Variables      */
const Int = createToken({ name: "Int", pattern: /\bint(?:<(\d+|auto)>)?\b/ });
const UnsignedInt = createToken({ name: "UnsignedInt", pattern: /\buint(?:<(\d+|auto)>)?\b/ });
const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z_][a-zA-Z0-9_]*/ });
const Assign = createToken({ name: "Assign", pattern: /=/ });
const Semicolon = createToken({ name: "Semicolon", pattern: /;/ });

// Create lexer
const KevlarLexer = new Lexer([Comment, Int, UnsignedInt, Identifier, Assign, NumberLiteral, Semicolon, Whitespace]);

export default KevlarLexer;
