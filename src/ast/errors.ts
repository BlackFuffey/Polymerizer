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
