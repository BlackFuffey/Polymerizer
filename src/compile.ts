
import KevlarLexer from "./lexer/Tokenizer.js"
import terminal from "./utils/terminal.js";


export default async (src: string) => {
    
    const spinner = terminal.spin("%spin%  tokenizing")
    
    try {
        const tokens = KevlarLexer.tokenize(src);


        if (tokens.errors.length > 0){
            spinner.reject();
           await spinner.promise;

           tokens.errors.forEach( err => {
               const errInfo = JSON.parse(err.message);
               console.log()
               terminal.err(errInfo.header);
               terminal.snippet(errInfo.before, errInfo.after, errInfo.line==1 ? 1 : errInfo.line-1)
           })
           process.exit(1)
       } else {
            spinner.resolve();
            await spinner.promise;

            console.log(tokens.tokens.map(t => {
                return {image: t.image, tokenType: t.tokenType}
            }));
        }

    } catch (err) {
        terminal.err(`An internal error has occured\n\n${err}`);
    }

}
