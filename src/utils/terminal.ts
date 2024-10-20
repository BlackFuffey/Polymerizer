import chalk from "chalk";
import cliSpinners from "cli-spinners";
import readline from "readline";
import stripAnsi from "strip-ansi";
import { SpinnerController, Spinner, FileCompileError } from "../types.js"

type SpinnerSettings = {
    spin: Spinner;
    success: string;
    failure: string;
}

type TerminalSettings = {
    spinner: SpinnerSettings
}

export const settings: TerminalSettings = {
    spinner: {
        spin: cliSpinners.dots,
        success: "✔",
        failure: "✘"
    }
}

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

    serr: (e: FileCompileError) => {
        console.log();
        terminal.info(`${e.filename}: ${e.line}-${e.column}`);
        terminal.err(e.header);
        terminal.snippet(e.before, e.error, e.after, e.line==1 ? 1 : e.line);
    },

    snippet: (msgBefore: string, err: string, msgAfter: string, from: number) => {
        const beforeLines = msgBefore.split('\n');
        const afterLines = msgAfter.split('\n');
        
        const errLine = beforeLines.pop() + chalk.red(err) + afterLines.shift();
        
        const lines = [ ...beforeLines, errLine, ...afterLines ];

        let atLine = from;
        let toLine = atLine + lines.length;
        let lineNumDigit = Math.max(`${atLine}`.length, `${toLine}`.length);
        
        let lineLen = lines.reduce((max: number, line: string) => {
            if (stripAnsi(line).length > max) max = line.length;
            return max;
        }, 0)

        lines.forEach( line => {
            const lineNum = chalk.dim(`${atLine}`.padStart(lineNumDigit, ' '));
            const lineTrail = ' '.repeat(lineLen - stripAnsi(line).length)
            const display = ` ${lineNum}  ${line}${lineTrail} `

            console.log(chalk.bgGrey.bgHex('221b25').white(display));
            
            atLine++;
        })
    },


    spin: (msg: string, settingOverride:SpinnerSettings = settings.spinner): SpinnerController => {
        
        let { spin, success, failure } = settingOverride;

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

        new Promise<void>((resolve, reject) => {
            spinController.resolve = async () => {
                resolve();
                return spinController.promise;
            },
            spinController.reject = async () => {
                reject();
                return spinController.promise;
            }
        }).catch(() => error = true).finally(() => finished = true);

        (async () => {
            let atFrame = 0;
            while (!finished){
                readline.clearLine(process.stdout, 0);
                readline.cursorTo(process.stdout, 0);

                process.stdout.write(msg.replace(
                    '%spin%', spin.frames[atFrame]
                ))

                atFrame++;
                
                if (atFrame >= spin.frames.length) atFrame = 0;

                await new Promise(resolve => setTimeout(resolve, spin.interval));
            }
            readline.clearLine(process.stdout, 0);
            readline.cursorTo(process.stdout, 0);
            
            if (!error)
                terminal.out(msg.replace(
                    '%spin%', chalk.green(success)
                ))
            else
                terminal.err(msg.replace(
                    '%spin%', failure
                ))

            finishSpin();
        })()
        
        return spinController;
    }
    
}

export default terminal;
