
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
