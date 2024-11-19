
import { CstNode, IToken } from "chevrotain";
import { KevlarCSTParser } from "./cst/Cst.js";
import KevlarLexer from "./lexer/Lexer.js"
import terminal from "./utils/terminal.js";
import { KevlarCstToAst } from "./ast/Traverse.js";
import { atfile } from "./App.js";
import { ASTNode } from "./ast/types.js";
//import KevlarAstToLLVMIR from "./codegen/llvmir.js";
//import { clang } from "./codegen/binary.js";

export enum CTarget {
    TOKENS      = "tokens",
    CST         = "cst",
    AST         = "ast",
    LLVM_IR     = "llvmir",
    BINARY      = "bin",
}

export default async function compile(src: string, target=CTarget.BINARY): Promise<string | Buffer> {

    const tokens = await tokenize(src);
    if (target === CTarget.TOKENS) return JSON.stringify(tokens);

    const cst = await parseCST(tokens);    
    if (target === CTarget.CST) return JSON.stringify(cst);

    const ast = await buildAST(cst!);
    if (target === CTarget.AST) return JSON.stringify(ast);

    terminal.crash("feature not implemented");

    return '';

}

async function genBin(ir: string){
    
    const spinner = terminal.spin("%spin%  Compiling");
    
    try {

        //await clang(ir, `${process.cwd()}/${atfile}.bin`)

    } catch (e: any) {
        await spinner.reject();
        terminal.err(e.stack);
        process.exit(-1);
    }
    
    await spinner.resolve();
}

async function genIR(ast: ASTNode<undefined>){

    const spinner = terminal.spin("%spin%  Generating Intermediate Representation");
    
    let ir: string;

    try {

        //ir = KevlarAstToLLVMIR(ast);

    } catch (e: any) {
        await spinner.reject();
        terminal.err(e.stack);
        process.exit(-1);
    }

    await spinner.resolve();
    //return ir;
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
