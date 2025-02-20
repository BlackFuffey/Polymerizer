import { CompileError } from "../types.js";
import { ASTType } from "./rules/typing/tstypes.js";

type ContextType = {
    variables: {
        [key: string]: ASTType<any>;
    },

    errors: CompileError[];
    warns: CompileError[];
}

const Context: ContextType = {
    variables: {},
    errors: [],
    warns: []
}

export default Context
