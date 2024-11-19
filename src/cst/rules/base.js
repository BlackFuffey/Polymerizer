import Tokens from "../../lexer/tokens.js";

export default function includeBaseRules(parser) {

    parser.RULE("program", () => {
        // Label each statement as 'statement'
        parser.MANY1(() => parser.SUBRULE(parser.statement, { LABEL: "statement" }));
        parser.MANY2(() => parser.SUBRULE(parser.scope, { LABEL: "scope" }));
    });

    parser.RULE("statement", () => {
        parser.OR([
            { ALT: () => parser.SUBRULE(parser.variableDeclaration, { LABEL: "variableDeclaration" }) },
            { ALT: () => parser.SUBRULE(parser.assignment, { LABEL: "assignment" }) },
            { ALT: () => parser.SUBRULE(parser.exit, { LABEL: "exit" }) }
        ]);

        parser.CONSUME(Tokens.EndOfStatement, { LABEL: 'endOfStatement' });
    });

    parser.RULE("scope", () => {
        parser.OR([
            { ALT: () => parser.SUBRULE(parser.ifElseBlock, { LABEL: 'ifElseBlock' }) }
        ])
    })

}
