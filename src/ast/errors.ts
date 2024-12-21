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
    return `Non-standard size ${size} may impact performance`;
}

export const NoFloatPreset = (preset: string) => {
    return `Unsupported float bit allocation preset ${preset}`
}

export const InvalidSign = (size: number) => {
    return `Sign bit size must be either 0 or 1, but got ${size}`;
}

export const SizeTooSmall = (type: string, size: number, min: number) => {
    return `Type "${type}" needs to be at least size ${min} but got size ${size}`
}
