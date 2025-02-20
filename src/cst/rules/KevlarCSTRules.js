import includeBaseRules from './base.js'
import includeVariableRules from './variable.js'
import includeFlowControlRules from './flowctr/flowctr.js'
import includeExpressionRules from './expression/expression.js'
import includeDebugRules from './debug.js'
import includeTypingRules from './typing/types.js'

const KevlarCSTRules = [
    includeBaseRules, includeVariableRules, includeFlowControlRules, 
    includeExpressionRules, includeDebugRules, includeTypingRules
]

/*
    All the CST Rules are javascript files so I can split rules
    into different sections, but chevotain's rule methods are all 
    private and typescript is prohibiting me from doing that.
*/

export default function includeKevlarCSTRules(parser) {
    KevlarCSTRules.forEach(rule => rule(parser));
}

