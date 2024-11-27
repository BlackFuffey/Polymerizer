import chalk from "chalk";
import cliSpinners from "cli-spinners";
import readline from "readline";
import stripAnsi from "strip-ansi";
import { SpinnerController, Spinner, FileCompileError } from "../types.js"

type SpinnerSettings = {
    spin: Spinner;
    success: string;
    failure: string;
    degrade: string;
}

type TerminalSettings = {
    spinner: SpinnerSettings;
    mute: boolean;
}

export const settings: TerminalSettings = {
    spinner: {
        spin: cliSpinners.dots,
        success: "✔ ",
        failure: "✘ ",
        degrade: " ",
    },
    mute: false
}

const terminal = {

    mute: (state: boolean) => {
        settings.mute = state;
    },

    err: (msg: string) => {
        console.error(chalk.red(msg));
    },

    crash: (msg: string, exitcode=1) => {
        terminal.err(msg);
        process.exit(exitcode);
    },

    out: (msg: string) => {
        if (settings.mute) return;
        console.log(msg);
    },

    info: (msg: string, out:(msg:string)=>void = console.info) => {
        //if (settings.mute) return;
        out(chalk.grey(msg));
    },

    warn: (msg: string) => {
        console.warn(chalk.yellow(msg));
    },

    serr: (e: FileCompileError) => {
        console.error();
        terminal.info(`${e.filename}: ${e.line}-${e.column}`, console.error);
        terminal.err(e.header);
        terminal.snippet(e.before, e.error, e.after, e.line==1 ? 1 : e.line, console.error);
    },

    swarn: (e: FileCompileError) => {
        console.error();
        terminal.info(`${e.filename}: ${e.line}-${e.column}`, console.warn);
        terminal.warn(e.header);
        terminal.snippet(e.before, e.error, e.after, e.line==1 ? 1 : e.line, console.warn);
    },

    snippet: (msgBefore: string, err: string, msgAfter: string, from: number, output: (msg:string)=>void) => {
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

            output(chalk.bgGrey.bgHex('221b25').white(display));

            atLine++;
        })
    },


    spin: (msg: string, settingOverride:SpinnerSettings = settings.spinner): SpinnerController => {

        if (settings.mute) {
            const obj = {
                promise: new Promise<void>(resolve => resolve()),
                    resolve: () => obj.promise,
                    reject: () => obj.promise,
                    degrade: () => obj.promise,

            };
                
            return obj;
        }


        const { spin, success, failure, degrade } = settingOverride;

        let finished = false;
        let state = 0;
        let finishSpin: () => void = () => {
            terminal.err("Spinner resolver was unset");
            process.exit(1);
        };

        const spinController: any = {
            resolve: undefined, reject: undefined, degrade: undefined,
            promise: new Promise<void>(resolve => finishSpin = resolve)
        };

        new Promise<void>((resolve, reject) => {
            spinController.resolve = async () => {
                resolve();
                state = 1;
                return spinController.promise;
            },
            spinController.degrade = async () => {
                resolve();
                state = 2;
                return spinController.promise;
            },
            spinController.reject = async () => {
                resolve();
                state = 3;
                return spinController.promise;
            }
        }).finally(() => finished = true);

        (async () => {
            let atFrame = 0;
            while (!finished){
                readline.clearLine(process.stdout, 0);
                readline.cursorTo(process.stdout, 0);

                process.stdout.write(msg.replace(
                    '%spin%', `${spin.frames[atFrame]} `
                ))

                atFrame++;

                if (atFrame >= spin.frames.length) atFrame = 0;

                await new Promise(resolve => setTimeout(resolve, spin.interval));
            }
            readline.clearLine(process.stdout, 0);
            readline.cursorTo(process.stdout, 0);

            if (state === 1)
                terminal.out(msg.replace(
                    '%spin%', chalk.green(success)
                ))
            if (state === 2)
                terminal.warn(msg.replace(
                    '%spin%', degrade
                ))
            if (state === 3)
                terminal.err(msg.replace(
                    '%spin%', failure
                ))

                finishSpin();
        })()

        return spinController;
    }

}

export default terminal;
