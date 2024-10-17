import chalk from "chalk";
import cliSpinners from "cli-spinners";
import readline from "readline";
import stripAnsi from "strip-ansi";
import { SpinnerController } from "../types.js"

const terminal = {
    
    err: (msg: string) => {
        console.error(chalk.red(msg));
    },

    out: (msg: string) => {
        console.log(msg);
    },

    info: (msg: string) => {
        console.info(chalk.grey(msg));
    },

    warn: (msg: string) => {
        console.warn(chalk.yellow(msg));
    },

    snippet: (msgBefore: string, msgAfter: string, from: number) => {
        const beforeLines = msgBefore.split('\n');
        const afterLines = msgAfter.split('\n');
        
        const errChar = afterLines[0].charAt(0);

        const errLine = beforeLines.pop() + chalk.red(errChar) + afterLines.shift()!.slice(1);
        
        const lines = [ ...beforeLines, errLine, ...afterLines ];

        let atLine = from;
        let toLine = atLine + lines.length;
        let lineNumDigit = Math.max(`${atLine}`.length, `${toLine}`.length);
        
        let lineLen = lines.reduce((max: number, line: string) => {
            if (stripAnsi(line).length > max) max = line.length;
            return max;
        }, 0)

        lines.forEach( line  => {
            
            const lineNum = chalk.dim(`${atLine}`.padStart(lineNumDigit, ' '));
            const lineTrail = ' '.repeat(lineLen - stripAnsi(line).length)
            const display = ` ${lineNum}  ${line}${lineTrail} `

            console.log(chalk.bgGrey.bgHex('221b25').white(display));
            
            atLine++;
        })
    },


    spin: (msg: string): SpinnerController => {
        let finished = false;
        let error = false;
        let finishSpin: () => void = () => {
            terminal.err("Spinner resolver was unset");
            process.exit(1);
        };

        const spinController: any = {
            resolve: undefined, reject: undefined, 
            promise: new Promise<void>(resolve => finishSpin = resolve)
        }

        new Promise((resolve, reject) => {
            spinController.resolve = resolve,
            spinController.reject = reject
        }).catch(e => error = true).finally(() => finished = true);

        (async () => {
            let atFrame = 0;
            while (!finished){
                readline.clearLine(process.stdout, 0);
                readline.cursorTo(process.stdout, 0);

                process.stdout.write(msg.replace(
                    '%spin%', cliSpinners.toggle3.frames[atFrame]
                ))

                atFrame++;
                
                if (atFrame >= cliSpinners.toggle3.frames.length) atFrame = 0;

                await new Promise(resolve => setTimeout(resolve, cliSpinners.toggle3.interval));
            }
            readline.clearLine(process.stdout, 0);
            readline.cursorTo(process.stdout, 0);
            
            if (!error)
                terminal.out(msg.replace(
                    '%spin%', chalk.green('✔')
                ))
            else
                terminal.err(msg.replace(
                    '%spin%', '✘'
                ))

            finishSpin();
        })()
        
        return spinController;
    }
    
}

export default terminal;
