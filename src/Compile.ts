
import { CstNode, IToken } from "chevrotain";
import { KevlarCSTParser } from "./cst/Cst.js";
import KevlarLexer from "./lexer/Lexer.js"
import terminal from "./utils/terminal.js";
import { KevlarCstToAst } from "./ast/Traverse.js";
import { atfile } from "./App.js";


export default async function compile(src: string) {

    const tokens = await tokenize(src);

    const cst = await parseCST(tokens);    

    const ast = await buildAST(cst!);

    console.log(JSON.stringify(ast, null, 4));

}

async function buildAST(cst: CstNode){
    
    const spinner = terminal.spin("%spin%  Building Abstract Syntax Tree");
    
    const { errors, ast } = KevlarCstToAst.build(cst);

    if (errors.length > 0){
        await spinner.reject();
        errors.forEach( err => 
            terminal.serr({...err, filename: atfile}) 
        );
        process.exit(1);
    }

    await spinner.resolve();

    return ast;
}

async function parseCST(tokens: IToken[]){
    
    const spinner = terminal.spin("%spin%  Building Concrete Syntax Tree")

    const cst = KevlarCSTParser.parse(tokens);

    if (cst.errors.length > 0) {
        await spinner.reject();

        cst.errors.forEach( err => {
            const errInfo = JSON.parse(err.message);
            terminal.serr({...errInfo, filename: atfile});
        })
        process.exit(1);
    }

    await spinner.resolve();

    return cst.result;
}

async function tokenize(src: string){
    try {
        const spinner = terminal.spin("%spin%  Tokenizing")

        const tokens = KevlarLexer.tokenize(src);

        if (tokens.errors.length > 0){
            await spinner.reject();

            tokens.errors.forEach( err => {
                const errInfo = JSON.parse(err.message);
                terminal.serr({...errInfo, filename: atfile});
            })
            process.exit(1)
        } else {
            await spinner.resolve();

            return tokens.tokens;
        }

    } catch (err) {
        terminal.err(`An internal error has occured\n\n${err}`);
        process.exit(1);
    }
}
