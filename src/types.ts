
export type SpinnerController = {
    promise: Promise<void>;
    resolve: () => Promise<void>;
    reject: () => Promise<void>;
    degrade: () => Promise<void>;
}

export type Spinner = {
    interval: number;
    frames: string[];
}

export type CompileError = {
    header: string;
    before: string;
    error: string;
    after: string;
    line: number;
    column: number;
}

export type FileCompileError = CompileError & {
    filename: string;
}


export enum CTarget {
    TOKENS      = "tokens",
    CST         = "cst",
    AST         = "ast",
    LLVM_IR     = "llvmir",
    BINARY      = "bin",
}

export type CompileParams = {
    jsonIndent: boolean,
    target: CTarget
}

