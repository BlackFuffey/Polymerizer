/*

import { spawn } from "child_process";

// Function to compile LLVM IR string to binary using clang
export function clang(llvmIR: string, outputFilePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        // Spawn the clang process
        const clangProcess = spawn('clang', ['-x', 'ir', '-', '-o', outputFilePath]);

        // Handle the stdin by writing the LLVM IR string
        clangProcess.stdin.write(llvmIR);
        clangProcess.stdin.end();

        // Capture any stdout or stderr
        clangProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        clangProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        // Handle process exit
        clangProcess.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`clang process exited with code ${code}`));
            }
        });
    });
}

*/
