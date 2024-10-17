import { ILexerErrorMessageProvider, IToken } from "chevrotain";

function extractSnippet(inputText: string, startOffset: number) {
  // Find the second newline before the bad token (startOffset)
  const preStartNewlines = [];
  for (let i = startOffset - 1; i >= 0; i--) {
    if (inputText[i] === '\n') {
      preStartNewlines.push(i);
      if (preStartNewlines.length === 2) break;
    }
  }

  // Find the second newline after the bad token (startOffset)
  const postStartNewlines = [];
  for (let i = startOffset; i < inputText.length; i++) {
    if (inputText[i] === '\n') {
      postStartNewlines.push(i);
      if (postStartNewlines.length === 2) break;
    }
  }

  // Determine the range for extraction
  const startExtract = preStartNewlines.length === 2 ? preStartNewlines[1] + 1 : 0; // If only one newline or none, start from beginning
  const endExtract = postStartNewlines.length === 2 ? postStartNewlines[1] : inputText.length; // If only one newline or none, end at last char

  // Split it into two parts: before the bad token and after it
  const before = inputText.slice(startExtract, startOffset);
  const after = inputText.slice(startOffset, endExtract);

  return {
    before,
    after
  };
}

const KevlarLexerErrorMessageProvider: ILexerErrorMessageProvider = {
    buildUnexpectedCharactersMessage(fullText: string, startOffset: number, length: number, line?: number, column?: number): string {
        const badToken = fullText.substring(startOffset, startOffset + length);
        return JSON.stringify({
            header: `Unexpected token "${badToken}" at line ${line} column ${column}`,
            ...extractSnippet(fullText, startOffset),
            line
        })
    },

    buildUnableToPopLexerModeMessage(token: IToken): string {
        return `Unexpected termination at token ${token}`
    }
}

export default KevlarLexerErrorMessageProvider;
