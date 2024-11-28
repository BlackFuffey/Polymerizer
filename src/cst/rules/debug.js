import Tokens from "../../lexer/Tokens.js"

export default function includeDebugRules(parser) {
    parser.RULE("print", () => {
        parser.CONSUME(Tokens.Print, { LABEL: "printKeyword" });
        parser.SUBRULE(parser.expression, { LABEL: "content" });
    });
}
