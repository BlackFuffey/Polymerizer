
export type SpinnerController = {
    promise: Promise<void>;
    resolve: () => void;
    reject: () => void;
}
