import fs from 'fs';
import chalk from 'chalk';
import cliSpinners from 'cli-spinners';
import terminal from './utils/terminal.js';
import compile from './Compile.js';


if (process.argv.length <= 2) {
    terminal.err('Bad usage: no file path specified')
    process.exit(1);
}

const path = process.argv.pop();

export let source: string = '';
export let atfile: string = path || '';

try {
    if (!fs.statSync(path!).isFile()){
        terminal.err(`Bad usage: "${path}" is not a file`)
        process.exit(1);
    }

    source = fs.readFileSync(path!, 'utf8');
    
    compile(source);

} catch (err) {
    // @ts-ignore
    terminal.err(err);
}

