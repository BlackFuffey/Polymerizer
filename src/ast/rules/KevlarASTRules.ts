import includeDebugRules from "../../cst/rules/debug.js";
import { KevlarVisitor } from "../Ast.js";
import includeBaseASTRules from "./base.js";
import includeDebugASTRules from "./debug.js";
import includeExpressionASTRules from "./expression/expression.js";
import includeFlowControlASTRules from "./flowctr/flowctr.js";
import includeVariableASTRules from "./variable.js";

const rules = [includeBaseASTRules, includeVariableASTRules, includeFlowControlASTRules, includeExpressionASTRules, includeDebugASTRules];

export default function includeKevlarASTRules(visitor: KevlarVisitor) {

    rules.forEach(includeRule => includeRule(visitor));

}
