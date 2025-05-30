import fs from 'fs/promises';
import terminal from './utils/terminal.js';
import { CompileParams, CTarget } from './tstypes.js';
import path from 'path';

// using static import for now
import compile from './compile.js'

enum Flags {
    TARGET              = "--target",
    SILENT              = "--silent",
    OUTPUT              = "--output",
    VERBOSE_JSON        = "--vbjson",
}

// delete node path and script path
process.argv.splice(0, 2);

if (process.argv.length === 0) {
    printHelp();
    process.exit(1);
}

const filepath = process.argv[0]!;

export let source: string = '';
export let atfile: string = filepath || '';

try {
    // import the compiler module asyncronously while processing command line args
    // currently broken
    //const compilerImport = import('./Compile.js');

    if (!(await fileExists(filepath) && await isFile(filepath)))
        terminal.crash(`Bad usage: "${filepath}" is not a file`)

    source = await fs.readFile(filepath!, 'utf8');

    let output = "a.out";

    let params: CompileParams = {
        jsonIndent: false,
        target: CTarget.BINARY
    }

    // TODO: use a command line flag processing library instead of this
    await Promise.all( process.argv.slice(1).map(async (flag) => {
        const [flagname, value] = flag.split("=", 2);

        switch (flagname) {
            case Flags.TARGET:
                if (!Object.values(CTarget).includes(value as CTarget)) 
                    terminal.crash(`Bad usage: invalid target "${value}"`)

                params.target = value as CTarget;
                return;

            case Flags.OUTPUT:
                if (value && value !== '-') {
                    const absPath = path.resolve(value);
                    if (!await isDir(path.dirname(absPath)))
                        terminal.crash(`Bad usage: no such directory "${path.dirname(absPath)}"`);
                }
                
                output = value!;
                return;

            case Flags.SILENT:
                terminal.mute(true);
                return;
            
            case Flags.VERBOSE_JSON:
                params.jsonIndent = true;
                return;

            default:
                terminal.crash(`Bad usage: flag "${flag}" was not understood`);
        }
    }) )
    
    // wait til compiler module has loaded before starting
    //const compile = (await compilerImport).default;

    const result = await compile(source, params);
    terminal.out("\nCompiled Successfully")

    if (output === '-'){
        console.log(result);
        process.exit(0);
    }

    await fs.writeFile(output, result);

} catch (err) {
    // @ts-ignore
    terminal.err((err as Error).stack!);
}

function printHelp() {
    console.log(
`Usage: polyc <file> [--flag1] [--flag2] [--flag3] ...
Possible Flags:
    --target=<target>       Specify compilation target
    --output=<file>         Specify output file, use - for stdout
    --silent                Disable status output on stdout, recommended if "--output=-" is used
    --vbjson                Make json output human readable

Possible targets:
    bin                     Compile to binary (default)
    llvmir                  Compile to LLVM IR
    ast                     Compile to abstract syntax tree
    cst                     Conpile to concrete syntax tree
    tokens                  Tokenization only`
    )
}

async function fileExists(filepath: string) {
    try { 
        await fs.access(filepath) 
        return true;
    } catch (err) {
        // @ts-ignore
        if (err?.code === 'ENOENT') return false;
        else throw err;
    }
}

async function isFile(filepath: string) {
    try {
        return (await fs.stat(path.resolve(filepath))).isFile();
    } catch (err) {
        // @ts-ignore
        if (err?.code === 'ENOENT') return false;
        else throw err;
    }
}

async function isDir(filepath: string) {
    try {
        return (await fs.stat(filepath)).isDirectory();
    } catch (err) {
        // @ts-ignore
        if (err?.code === 'ENOENT') return false;
        else throw err;
    }
}
