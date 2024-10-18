import { ILexerErrorMessageProvider, IToken } from "chevrotain";
import extractSnippet from "../utils/snippet.js";

const KevlarLexerErrorMessageProvider: ILexerErrorMessageProvider = {
    buildUnexpectedCharactersMessage(fullText: string, startOffset: number, length: number, line?: number, column?: number): string {
        const badToken = fullText.substring(startOffset, startOffset + length);
        return JSON.stringify({
            header: `Unexpected symbol "${badToken}" at line ${line} column ${column}`,
            ...extractSnippet(fullText, startOffset, startOffset),
            line
        })
    },

    buildUnableToPopLexerModeMessage(token: IToken): string {
        return `Unexpected termination at token ${token}`
    }
}

export default KevlarLexerErrorMessageProvider;
