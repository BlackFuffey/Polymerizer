import { CompileError } from "../types.js";
import { ASTType } from "./types.js";

type ContextType = {
    variables: {
        [key: string]: ASTType<any>;
    },

    errors: CompileError[];
}

const Context: ContextType = {
    variables: {},
    errors: []
}

export default Context
