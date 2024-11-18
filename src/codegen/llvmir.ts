/*
import { ASTExitProps, ASTExpression, ASTLitProps, ASTNode, ASTType, ASTVarProps } from "../ast/types.js";

type LLVMVar = {
    type: string;
    varname: string;
}

type LLVMLit = {
    type: string;
    value: string;
}

export default function generateLLVM(ast: ASTNode<any>): string {
    let llvmCode = "";
    // Start of the main function
    llvmCode += "define i32 @main() {\n";

    function processNode(node: ASTNode<any>) {
        switch (node.type) {
            case "PROGRAM":
                node.children?.forEach(child => processNode(child));
                break;
            case "VARIABLE_DECLARE":
                declareVariable(node);
                break;
            case "VARIABLE_ASSIGN":
                assignVariable(node);
                break;
            case "EXIT":
                generateExit(node);
                break;
        }
    }

    function declareVariable(node: ASTNode<ASTVarProps>) {
        const { varname, type, assign } = node.props;
        const varType = getLLVMType(type);

        llvmCode += `%"${varname}" = alloca ${varType}, align 4\n`;

        if (assign) {
            const val = expToVal(assign);

            // @ts-ignore
            llvmCode += `store ${varType} ${val.value || `%"${val.varname}"`}, ${varType}* %"${varname}", align 4\n`;
        }
    }

    function assignVariable(node: ASTNode<ASTVarProps>) {
        console.log(JSON.stringify(node, null, 2))
        const { varname, assign, type } = node.props;
        const val = expToVal(assign!);
        const varType = getLLVMType(type);

        // @ts-ignore
        llvmCode += `store ${varType} ${val.value || `%"${extVar(val.varname, val.type, varType, true}"`}, ${varType}* %"${varname}", align 4\n`;
    }

    function generateExit(node: ASTNode<ASTExitProps>) {
        const exitCode = node.props.exitCode;
        const exitType = getLLVMType(exitCode.type);
        const val = expToVal(node.props.exitCode);

        // @ts-ignore
        llvmCode += `ret i32 %"${val.varname || val.value}"\n`;
    }

    function getLLVMType(type: ASTType<any>): string {
        console.log(type);
        switch (type.basetype) {
            case "int":
                return `i${type.props.size}`;
            case "uint":
                return `i${type.props.size}`;
            default:
                throw new Error(`Unknown type: ${type.basetype}`);
        }
    }

    function useVar(varname: string, type: string): string {
        const tmpvar = nextTmpVar();
        llvmCode += `%"${tmpvar}" = load ${type}, ${type}* %"${varname}", align 4\n`;
        return tmpvar;
    }

    function extVar(fromVar: string, fromSize: string, toSize: string, signed: boolean): string {
        const tmpvar = nextTmpVar();

        if (signed)
            llvmCode += `%"${tmpvar}" = sext ${fromSize} %"${fromVar}" to ${toSize}\n`;
        else
            llvmCode += `%"${tmpvar}" = zext ${fromSize} %"${fromVar}" to ${toSize}\n`;

        return tmpvar;
    }

    function expToVal(exp: ASTExpression<ASTVarProps|ASTLitProps>): LLVMVar | LLVMLit {

        if ('literal' in exp.components) return {
                type: getLLVMType(exp.type),
                value: exp.components.literal.toString()
        };

        if ('varname' in exp.components) {
            const type = getLLVMType(exp.type)
            return {
                type,
                varname: useVar(exp.components.varname, type),
            }
        }

        throw new Error("Unsupported assignment value");
        
    }
    
    let tmpVarIndex = 0;
    function nextTmpVar(){
        tmpVarIndex++;
        return `tmpvar ${tmpVarIndex}`;
    }

    // Process the AST to generate LLVM code
    processNode(ast);

    // End the main function with a default return
    llvmCode += "ret i32 0\n";
    llvmCode += "}\n";

    return llvmCode;
}

*/
