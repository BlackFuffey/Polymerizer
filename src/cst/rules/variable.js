import Tokens from "../../lexer/Tokens.js"

const {
    Identifier, Assign
} = Tokens

export default function includeVariableRules(parser) {

    parser.RULE("variableDeclaration", () => {
        parser.SUBRULE(parser.types, { LABEL: "dataType" });

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
