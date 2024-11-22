import { CstParser, CstNode, IToken } from "chevrotain";
import Tokens from "../lexer/Tokens.js";
import KevlarParserErrorMessageProvider from "./ParserErrmsgProvider.js";

// @ts-ignore
import includeKevlarCSTRules from "./rules/KevlarCSTRules.js"


class KevlarParser extends CstParser {

    constructor() {
        super(Tokens, { errorMessageProvider: KevlarParserErrorMessageProvider });

        includeKevlarCSTRules(this);

        this.performSelfAnalysis();
    }
    
}

const parser = new KevlarParser();

export const KevlarCSTParser = {
    parse: (tokens: IToken[]) => {

        parser.input = tokens;

        // @ts-ignore
        const cst = parser.program();

        return { errors: parser.errors, result: cst }; 
    }
};

export const KevlarVisitorBase = parser.getBaseCstVisitorConstructor()

export const KevlarDefaultVisitorBase = parser.getBaseCstVisitorConstructorWithDefaults();
