import Tokens from '../../../lexer/tokens.js'

export default function includeExpressionRules(parser) {
    parser.RULE("expression", () => {
        parser.OPTION1(() => {
            parser.CONSUME(Tokens.ExpStart, { LABEL: "expStart" });
        });
        parser.OR([
            { ALT: () => parser.CONSUME(Tokens.IntLiteral, { LABEL: "intLiteral" }) },
            { ALT: () => parser.CONSUME(Tokens.UIntLiteral, { LABEL: "uintLiteral" }) },
            { ALT: () => parser.CONSUME(Tokens.BoolLiteral, { LABEL: "boolLiteral" }) },
            { ALT: () => parser.CONSUME(Tokens.Identifier, { LABEL: "variableRef" }) },
            { ALT: () => parser.CONSUME(Tokens.FloatLiteral, { LABEL: "floatLiteral" }) },
        ]);
        parser.OPTION2(() => {
                parser.CONSUME(Tokens.ExpEnd, { LABEL: "expEnd" });
        });
    });
}
