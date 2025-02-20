export const VariableUndeclared = (varname: string) => {
    return `Variable "${varname}" was not declared`;
}

export const VariableRedeclare = (varname: string) => {
    return `Cannot redeclare variable "${varname}"`;
}

export const VariableCastLoss = (typeFrom: string, typeTo: string) => {
    return `Cannot losslessly cast type "${typeFrom}" to "${typeTo}"`;
}

export const InvalidType = (type: string) => {
    return `Invalid type ${type}`;
}

export const NonStdSize = (size: number) => {
    return `Non full-byte size ${size} may impact performance`;
}

export const NoFloatPreset = (preset: string) => {
    return `Unsupported float memory layout preset ${preset}`
}

export const InvalidValue = (name: string, allowed: any[] | string, given: number, invert=false) => {
    const allowedText = (() => {
        if (typeof allowed=== 'string') return allowed;

        if (allowed.length === 0) return 'your mom';

        return allowed.reduce((accum, e, i) => {
            const base = `${accum}"${e}"`;

            if (allowed.length-2 === i) return `${base} or `;
            if (allowed.length-1 === i) return base;

            return `${base}, `;
        }, '')
    })();

    return `${name} must${invert?' not':''} be ${allowedText}, but got "${given}" ${invert?"anyway":"instead"}`;
}

export const SizeTooSmall = (type: string, size: number, min: number) => {
    return `Type "${type}" needs to be at least size ${min} but got size ${size}`
}
