import { IToken, ILexerErrorMessageProvider, Lexer } from "chevrotain";
import { asArray as Tokens } from "./tokens.js";
import { extractSnippet } from "utils/snippet.js";

const KevlarLexerErrorMessageProvider: ILexerErrorMessageProvider = {
    buildUnexpectedCharactersMessage(fullText: string, startOffset: number, length: number, line?: number, column?: number): string {
        const badToken = fullText.substring(startOffset, startOffset + length);
        return JSON.stringify({
            header: `Unexpected symbol "${badToken}"`,
            ...extractSnippet(startOffset, startOffset),
            line,
            column
        })
    },

    buildUnableToPopLexerModeMessage(token: IToken): string {
        return `Unexpected termination at token ${token}`
    }
}

const KevlarLexer = new Lexer(
    Tokens,
    { errorMessageProvider: KevlarLexerErrorMessageProvider}
);

export default KevlarLexer;

