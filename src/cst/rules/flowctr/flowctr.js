import Tokens from "../../../lexer/tokens.js"

export default function includeFlowControlRules(parser) {

    parser.RULE("exit", () => {
        parser.CONSUME(Tokens.Exit, { LABEL: "exitKeyword" });
        parser.SUBRULE(parser.expression, { LABEL: "exitCode" });
    });

    parser.RULE("ifElseBlock", () => {
        parser.CONSUME(Tokens.If, { LABEL: "ifKeyword" });
        parser.SUBRULE1(parser.expression, { LABEL: "condition" });
        parser.OR1([
            { ALT: () => parser.SUBRULE2(parser.statement, { LABEL: "statement" }) },
            { ALT: () => parser.SUBRULE2(parser.scopeBlock, { LABEL: "scopeBlock" }) },
        ])

        parser.OPTION(() => {
            parser.CONSUME(Tokens.Else, { LABEL: "elseKeyword" });
            parser.OR2([
                { ALT: () => parser.SUBRULE3(parser.statement, { LABEL: "statement" }) },
                { ALT: () => {
                    parser.CONSUME(Tokens.ScopeStart, { LABEL: "scopeStart" });
                    parser.MANY(() => parser.SUBRULE(parser.statement, { LABEL: "statement" }))
                    parser.CONSUME(Tokens.ScopeEnd, { LABEL: "scopeEnd" });
                }}
            ])
        })
    }) 

    parser.RULE("scopeBlock", () => {
        parser.CONSUME(Tokens.ScopeStart, { LABEL: "scopeStart" });
                parser.MANY(() => parser.SUBRULE(parser.statement, { LABEL: "statement" }))
        parser.CONSUME(Tokens.ScopeEnd, { LABEL: "scopeEnd" });
    })
}
