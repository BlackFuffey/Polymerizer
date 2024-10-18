import { CstParser, CstNode, TokenType, IToken } from "chevrotain";
import Tokens from "../lexer/tokens.js";
import KevlarParserErrorMessageProvider from "./ParserErrmsgProvider.js";

const { 
    Int, 
    UnsignedInt, 
    Identifier, 
    Assign,
    IntLiteral,
    Exit,
    Semicolon
} = Tokens;

class KevlarParser extends CstParser {

    public program!: () => CstNode;
    public statement!: () => CstNode;
    public variableDeclaration!: () => CstNode;
    public assignment!: () => CstNode;
    public exit!: () => CstNode;
    public expression!: () => CstNode;

    
    constructor() {
        super(Tokens, { errorMessageProvider: KevlarParserErrorMessageProvider });

        // Define grammar rules
        this.RULE("program", () => {
            // Label each statement as 'statement'
            this.MANY(() => this.SUBRULE(this.statement, { LABEL: "statement" }));
        });

        this.RULE("statement", () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.variableDeclaration, { LABEL: "variableDeclaration" }) },
                { ALT: () => this.SUBRULE(this.assignment, { LABEL: "assignment" }) },
                { ALT: () => this.SUBRULE(this.exit, { LABEL: "exitStatement" }) }
            ]);
        });

        this.RULE("variableDeclaration", () => {
            this.OR([
                { ALT: () => this.CONSUME(Int, { LABEL: "dataType" }) },
                { ALT: () => this.CONSUME(UnsignedInt, { LABEL: "dataType" }) }
            ]);
            this.CONSUME(Identifier, { LABEL: "varName" });

            this.OPTION(() => {
                this.CONSUME(Assign, { LABEL: "assignOp" });
                this.SUBRULE(this.expression, { LABEL: "initialValue" });
            });

            this.CONSUME(Semicolon, { LABEL: "semicolon" });
        });

        this.RULE("assignment", () => {
            this.CONSUME(Identifier, { LABEL: "varName" });
            this.CONSUME(Assign, { LABEL: "assignOp" });
            this.SUBRULE(this.expression, { LABEL: "value" });
            this.CONSUME(Semicolon, { LABEL: "semicolon" });
        });

        this.RULE("exit", () => {
            this.CONSUME(Exit, { LABEL: "exitKeyword" });
            this.SUBRULE(this.expression, { LABEL: "exitCode" });
            this.CONSUME(Semicolon, { LABEL: "semicolon" });
        });

        this.RULE("expression", () => {
            this.OR([
                { ALT: () => this.CONSUME(IntLiteral, { LABEL: "literalValue" }) },
                { ALT: () => this.CONSUME(Identifier, { LABEL: "variableRef" }) }
            ]);
        });

        this.performSelfAnalysis();
    }
}

const KevlarCSTParser = {
    parse: (tokens: IToken[]) => {
        const parser = new KevlarParser();

        parser.input = tokens;

        const cst = parser.program();

        return { errors: parser.errors, result: cst ? cst.children.statement : undefined }; 
    }
};

export default KevlarCSTParser;
