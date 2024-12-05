import Tokens from "../../lexer/Tokens.js";

export default function includeBaseRules(parser) {

    parser.RULE("program", () => {
        parser.MANY( () => parser.OR([
            { ALT: () => parser.SUBRULE1(parser.statement) },
            { ALT: () => parser.SUBRULE1(parser.scope) },
        ]) )

        //parser.OPTION( () => parser.SUBRULE2(parser.endStatement) )

    })

    /*
    parser.RULE("endStatement", () => {
        parser.OR1([
            { ALT: () => parser.SUBRULE(parser.variableDeclaration, { LABEL: "variableDeclaration" }) },
            { ALT: () => parser.SUBRULE(parser.assignment, { LABEL: "assignment" }) },
            { ALT: () => parser.SUBRULE(parser.exit, { LABEL: "exit" }) }
        ]);

        parser.OPTION1(() => parser.OR2([
            { ALT: () => parser.CONSUME1(Tokens.Semicolon) },
            { ALT: () => parser.CONSUME1(Tokens.Newline) }
        ]))
        parser.OPTION2(() => parser.CONSUME2(Tokens.Newline))
    });
    */

    parser.RULE("statement", () => {
        parser.OR1([
            { ALT: () => parser.SUBRULE(parser.variableDeclaration, { LABEL: "variableDeclaration" }) },
            { ALT: () => parser.SUBRULE(parser.assignment, { LABEL: "assignment" }) },
            { ALT: () => parser.SUBRULE(parser.exit, { LABEL: "exit" }) },
            { ALT: () => parser.SUBRULE(parser.print, { LABEL: "print" }) },
        ]);
        
        parser.CONSUME(Tokens.Semicolon);
        /*
        parser.OR2([
            { ALT: () => parser.CONSUME1(Tokens.Semicolon) },
            { ALT: () => parser.CONSUME1(Tokens.Newline) }
        ])

        parser.OPTION(() => parser.CONSUME2(Tokens.Newline))
        */
    });

    parser.RULE("scope", () => {
        parser.OR([
            { ALT: () => parser.SUBRULE(parser.ifElseBlock, { LABEL: 'ifElseBlock' }) }
        ])
    })

}
