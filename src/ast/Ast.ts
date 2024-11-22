import { KevlarVisitorBase } from "../cst/Cst.js";
import { CstNode } from "chevrotain";
import includeKevlarASTRules from "./rules/KevlarASTRules.js";
import Context from "./Context.js";

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
        return { errors: Context.errors, ast: visitor.visit(cst) };
    }

} 
