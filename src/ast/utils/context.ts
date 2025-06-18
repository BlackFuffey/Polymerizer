import { CompileError } from "@/tstypes";
import { ASTType } from "../rules/typing/tstypes";

type ContextType = {
    variables: {
        [key: string]: ASTType<any>;
    },

    errors: CompileError[];
    warnings: CompileError[];
}

const Context: ContextType = {
    variables: {},
    errors: [],
    warnings: []
}

export default Context;
