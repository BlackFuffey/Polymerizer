import { KevlarVisitorBase } from "../cst/cst";
import { CstNode } from "chevrotain";
import includeKevlarASTRules from "./rules/rules";
import Context from "./context";

export class KevlarVisitor extends KevlarVisitorBase {

    constructor() {
        super();
        includeKevlarASTRules(this);
        this.validateVisitor();
    }    

}

const visitor = new KevlarVisitor();

export const KevlarCstToAst = {
    
    build(cst: CstNode[] | CstNode){
        return { errors: Context.errors, warnings: Context.warnings, ast: visitor.visit(cst) };
    }

} 
