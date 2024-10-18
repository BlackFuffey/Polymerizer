
export type SpinnerController = {
    promise: Promise<void>;
    resolve: () => Promise<void>;
    reject: () => Promise<void>;
}

export type Spinner = {
    interval: number;
    frames: string[];
}
