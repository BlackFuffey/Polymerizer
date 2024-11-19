import fs from 'fs/promises';
import terminal from './utils/terminal.js';
import compile, { CTarget } from './Compile.js';
import path from 'path';

enum Flags {
    TARGET      = "--target",
    SILENT      = "--silent",
    OUTPUT      = "--output",
}

process.argv.shift();

if (process.argv.length <= 1) {
    printHelp();
    process.exit(0);
}

const filepath = process.argv[1];

export let source: string = '';
export let atfile: string = filepath || '';

try {
    if (!(await fileExists(filepath) && await isFile(filepath)))
        terminal.crash(`Bad usage: "${filepath}" is not a file`)

    source = await fs.readFile(filepath!, 'utf8');

    let target = "bin";
    let output = "a.out";

    process.argv.forEach(async (flag, i) => {
        if (i < 2) return;

        const sflag = flag.split("=", 2);
        switch (sflag[0]) {
            case Flags.TARGET:
                if (!Object.values(CTarget).includes(sflag[1] as CTarget)) 
                    terminal.crash(`Bad usage: invalid target "${sflag[1]}"`)

                target = sflag[1];
                return;

            case Flags.OUTPUT:
                if (sflag[1] !== '-') {
                    if (await isDir(sflag[i]))
                        terminal.crash(`Bad usage: no such directory`);
                }
                
output = sflag[1];
                return

            case Flags.SILENT:
                terminal.mute(true);
                return;
            
            default:
                terminal.crash(`Bad usage: flag "${flag}" was not understood`);
        }
    })
    
    const result = await compile(source, target as CTarget);

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
    --silent                Disable status output, recommended if "--output=-" is used

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
    return (await fs.stat(filepath)).isFile();
}

async function isDir(filepath: string) {
    return (await fs.stat(filepath)).isDirectory();
}
