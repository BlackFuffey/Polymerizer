import chalk from "chalk";
import KevlarLexer from "./lexer/Tokenizer.js";

console.log(JSON.stringify( KevlarLexer.tokenize(`
    uint<32> integer = 0;
    int integer = 0;
`), null, 4));

