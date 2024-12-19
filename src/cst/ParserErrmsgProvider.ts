import { 
    IParserErrorMessageProvider, 
    IToken,
    TokenType
} from "chevrotain";
import extractSnippet from "../utils/snippet.js";
import CEbuilder from "../utils/snippet.js";

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

type NotAllInputParsedErrorOptions = {
    firstRedundant: IToken;
    ruleName: string;
}

const KevlarParserErrorMessageProvider: IParserErrorMessageProvider = {
    // Custom error message for a mismatched token
    buildMismatchTokenMessage(options: MissmatchTokenErrorOptions) {
        
        const { image, startLine, startColumn } = options.actual;

        return JSON.stringify(CEbuilder(
            `Expected token "${options.expected.LABEL || options.expected.name}" but found "${image}" at line ${startLine} column ${startColumn}. (${options.ruleName})`,
            options.actual
        ));
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

        return JSON.stringify(CEbuilder(options.expectedPathsPerAlt
            .map(alt1 => alt1.map(alt2 => alt2.map(token => token.LABEL)
            .join(", ")).join(" | ")).join(" or "),
            actual
        ));
    },

    // Custom error message for an early-exit (repetition) failure
    buildEarlyExitMessage(options: any) {
        return "Build early exit message not implemented";
     // return `Error: Early exit from a repetitive pattern. Expected: ${expectedIterationPaths
     //     .map(path => path.map(token => token.label).join(", "))
     //     .join(" or ")}.`;
    },

    buildNotAllInputParsedMessage(options: NotAllInputParsedErrorOptions) {
        
        const { image, startLine, startColumn } = options.firstRedundant;

        return JSON.stringify(CEbuilder(
            `Unexpected token "${image}" at line ${startLine} column ${startColumn}. (${options.ruleName})`,
            options.firstRedundant
        ));
    },
}

export default KevlarParserErrorMessageProvider;
