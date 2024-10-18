
import { IToken } from "chevrotain";
import KevlarCSTParser from "./st/Cst.js";
import KevlarLexer from "./lexer/Lexer.js"
import terminal from "./utils/terminal.js";


export default async (src: string) => {

    const tokens = await tokenize(src);

    const cst = await parseCST(tokens);    
    console.log(JSON.stringify(cst, null, 4));

}

async function parseCST(tokens: IToken[]){
    
    const spinner = terminal.spin("%spin%  Building Syntax Tree")

    const cst = KevlarCSTParser.parse(tokens);

    if (cst.errors.length > 0) {
        await spinner.reject();

        cst.errors.forEach( err => {
            const errInfo = JSON.parse(err.message);
            console.log()
            terminal.err(errInfo.header);
            terminal.snippet(errInfo.before, errInfo.error, errInfo.after, errInfo.line==1 ? 1 : errInfo.line-1)
        })
        process.exit(1);
    }

    await spinner.resolve();

    return cst;
}

async function tokenize(src: string){
    try {
        const spinner = terminal.spin("%spin%  Tokenizing")

        const tokens = KevlarLexer.tokenize(src);

        if (tokens.errors.length > 0){
            await spinner.reject();

            tokens.errors.forEach( err => {
                const errInfo = JSON.parse(err.message);
                console.log(errInfo)
                terminal.err(errInfo.header);
                terminal.snippet(errInfo.before, errInfo.error, errInfo.after, errInfo.line==1 ? 1 : errInfo.line-1)
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
