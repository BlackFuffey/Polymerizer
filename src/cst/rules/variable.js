import Tokens from "../../lexer/Tokens.js"

const {
    Int, UnsignedInt, Boolean, Identifier, Assign, Semicolon
} = Tokens

export default function includeVariableRules(parser) {

    parser.RULE("variableDeclaration", () => {
        parser.OR([
            { ALT: () => parser.CONSUME(Int, { LABEL: "dataType" }) },
            { ALT: () => parser.CONSUME(UnsignedInt, { LABEL: "dataType" }) },
            { ALT: () => parser.CONSUME(Boolean, { LABEL: "dataType" }) }
        ]);
        parser.CONSUME(Identifier, { LABEL: "varName" });

        parser.OPTION(() => {
            parser.CONSUME(Assign, { LABEL: "assignOp" });
            parser.SUBRULE(parser.expression, { LABEL: "initialValue" });
        });
    });

    parser.RULE("assignment", () => {
        parser.CONSUME(Identifier, { LABEL: "varName" });
        parser.CONSUME(Assign, { LABEL: "assignOp" });
        parser.SUBRULE(parser.expression, { LABEL: "value" });
    });

}
