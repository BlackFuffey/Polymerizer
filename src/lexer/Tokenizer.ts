import { createToken, Lexer } from "chevrotain";
import KevlarLexerErrorMessageProvider from "./ErrorMessageProvider.js";

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
const Int = createToken({ name: "Int", pattern: /\bint(?:\<(\d+|auto)\>)?/ });
const UnsignedInt = createToken({ name: "UnsignedInt", pattern: /\buint(?:\<(\d+|auto)\>)?/ });
const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z_][a-zA-Z0-9_]*/ });
const IntLiteral = createToken({ name: "IntLiteral", pattern: /[+-]?\d(?:_?\d)*/
})
const Assign = createToken({ name: "Assign", pattern: /=/ });
const Semicolon = createToken({ name: "Semicolon", pattern: /;/ });
const Return = createToken({ name: "Return", pattern: /\breturn\b/ })

// Create lexer
const KevlarLexer = new Lexer(
    [Comment, Int, UnsignedInt, Return, IntLiteral, Identifier, Assign, NumberLiteral, Semicolon, Whitespace],
    { errorMessageProvider: KevlarLexerErrorMessageProvider}
);

export default KevlarLexer;
