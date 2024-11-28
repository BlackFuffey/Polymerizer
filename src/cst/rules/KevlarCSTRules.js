import includeBaseRules from './base.js'
import includeVariableRules from './variable.js'
import includeFlowControlRules from './flowctr/flowctr.js'
import includeExpressionRules from './expression/expression.js'
import includeDebugRules from './debug.js'

const KevlarCSTRules = [
    includeBaseRules, includeVariableRules, includeFlowControlRules, 
    includeExpressionRules, includeDebugRules
]

export default function includeKevlarCSTRules(parser) {
    KevlarCSTRules.forEach(rule => rule(parser));
}

