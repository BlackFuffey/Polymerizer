import { createToken, Lexer } from "chevrotain";
import KevlarLexerErrorMessageProvider from "./LexerErrmsgProvider.js";
import { asArray as Tokens } from "./Tokens.js";


// Create lexer
const KevlarLexer = new Lexer(
    Tokens,
    { errorMessageProvider: KevlarLexerErrorMessageProvider}
);

export default KevlarLexer;
