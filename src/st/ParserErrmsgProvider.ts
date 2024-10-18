import { 
    IParserConfig, 
    IParserErrorMessageProvider, 
    IRecognitionException,
    IToken,
    TokenType
} from "chevrotain";
import extractSnippet from "../utils/snippet.js";
import source from "../App.js";

type MissmatchTokenErrorOptions = {
    expected: TokenType;
    actual: IToken;
    previous: IToken;
    ruleName: string;
}

type NoViableAltErrorOptions = {
    expectedPathsPerAlt: TokenType[][][];
    actual: IToken[];
    previous: IToken;
    ruleName: string;
}

const KevlarParserErrorMessageProvider: IParserErrorMessageProvider = {
    // Custom error message for a mismatched token
    buildMismatchTokenMessage(options: MissmatchTokenErrorOptions) {
        
        const { startOffset, endOffset, image, startLine, startColumn } = options.actual;

        const snippet = extractSnippet(
            source, 
            startOffset,
            endOffset || startOffset
        );

        return JSON.stringify({
            header: `Expected token "${options.expected.LABEL || options.expected.name}" but found "${image}" at line ${startLine} column ${startColumn}. (${options.ruleName})`,
            ...snippet,
            line: startLine
        });
    },

    // Custom error message for a no-viable-alt (OR alternation) failure
    buildNoViableAltMessage(options: NoViableAltErrorOptions) {
        
        const actual = options.actual.reduce( (combine, token) => {
            combine.image += token.image;
            

            if (token.startOffset < combine.startOffset) 
                combine.startOffset = token.startOffset;
            
            if (token.endOffset && !combine.endOffset) 
                combine.endOffset = token.endOffset;

            if (token.endOffset && combine.endOffset && token.endOffset > combine.endOffset) 
                combine.endOffset = token.endOffset;
            

            if (token.startLine && !combine.startLine) 
                combine.startLine = token.startLine;

            if (token.startLine && combine.startLine && token.startLine < combine.startLine) 
                combine.startLine = token.startLine;
            
            if (token.endLine && !combine.endLine) 
                combine.endLine = token.endLine;

            if (token.endLine && combine.endLine && token.endLine > combine.endLine) 
                combine.endLine = token.endLine;


            return combine;
        });

        const snippet = extractSnippet(
            source,
            actual.startOffset,
            actual.endOffset || actual.startOffset
        )
        
        return JSON.stringify({
            header: options.expectedPathsPerAlt
            .map(alt1 => alt1.map(alt2 => alt2.map(token => token.LABEL)
            .join(", ")).join(" | ")).join(" or "),
            ...snippet,
            line: actual.startLine
        });
    },

    // Custom error message for an early-exit (repetition) failure
    buildEarlyExitMessage(options: any) {
        return "Build early exit message not implemented";
     // return `Error: Early exit from a repetitive pattern. Expected: ${expectedIterationPaths
     //     .map(path => path.map(token => token.label).join(", "))
     //     .join(" or ")}.`;
    },

    // Additional error types can be handled here...
    buildNotAllInputParsedMessage(options: any) {
        return "Not all input parsed message not implemented";
        //  return `Error: Unexpected token "${firstRedundant.image}".`;
    }
}

export default KevlarParserErrorMessageProvider;
