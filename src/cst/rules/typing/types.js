import Tokens from "../../../lexer/Tokens.js"

export default function includeTypingRules(parser) {
    parser.RULE("types", () => {
        parser.OR1([
            { ALT: () => {
                parser.CONSUME(Tokens.Int, { LABEL: "basetype" });
                parser.OPTION1(() => {
                    parser.CONSUME1(Tokens.TypeStart);
                    parser.SUBRULE1(parser.expression, { LABEL: "size" });
                    parser.CONSUME1(Tokens.TypeEnd);
                })
            } },
            { ALT: () => {
                parser.CONSUME(Tokens.UnsignedInt, { LABEL: "basetype" });
                parser.OPTION2(() => {
                    parser.CONSUME2(Tokens.TypeStart);
                    parser.SUBRULE2(parser.expression, { LABEL: "size" });
                    parser.CONSUME2(Tokens.TypeEnd);
                })
            } },
            { ALT: () => {
                parser.CONSUME(Tokens.Float, { LABEL: "basetype" })
                parser.OPTION3(() => {
                    parser.CONSUME3(Tokens.TypeStart);
                    parser.SUBRULE4(parser.expression, { LABEL: "size" });       
                    parser.OPTION4(() => {
                        parser.CONSUME1(Tokens.Separator)
                        parser.SUBRULE5(parser.expression, { LABEL: "exponent" }) 
                        parser.CONSUME2(Tokens.Separator)
                        parser.SUBRULE6(parser.expression, { LABEL: "fraction" }) 
                    })
                    parser.CONSUME3(Tokens.TypeEnd);
                })
            } },
            { ALT: () => parser.CONSUME(Tokens.Boolean, { LABEL: "basetype" }) },
            { ALT: () => parser.CONSUME(Tokens.Char, { LABEL: "basetype" }) },
        ])
    })
}