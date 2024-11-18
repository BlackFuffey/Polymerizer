import fs from 'fs';
import terminal from './utils/terminal.js';
import compile from './Compile.js';


if (process.argv.length <= 2)
    terminal.crash('Bad usage: no file path specified')

const path = process.argv.pop();

export let source: string = '';
export let atfile: string = path || '';

try {
    if (!fs.statSync(path!).isFile())
        terminal.crash(`Bad usage: "${path}" is not a file`)

    source = fs.readFileSync(path!, 'utf8');
    
    compile(source);

} catch (err) {
    // @ts-ignore
    terminal.err(err);
}
