import includeDebugRules from "../../cst/rules/debug.js";
import { KevlarVisitor } from "../ast.js";
import includeBaseASTRules from "./base.js";
import includeDebugASTRules from "./debug.js";
import includeExpressionASTRules from "./expression/expression.js";
import includeFlowControlASTRules from "./flowctr/flowctr.js";
import includeTypeASTRules from "./typing/typing.js";
import includeVariableASTRules from "./variable.js";

const rules = [includeBaseASTRules, includeVariableASTRules, includeFlowControlASTRules, includeExpressionASTRules, includeDebugASTRules, includeTypeASTRules];

export default function includeKevlarASTRules(visitor: KevlarVisitor) {

    /*
        If you look into any of the AST Rule files, you will notice
        there is a @ts-ignore on every line that assigns something to visitor.
        This is to get around typescript's restriction of class
        method can only be defined inside a class.
    */

    rules.forEach(includeRule => includeRule(visitor));

}
