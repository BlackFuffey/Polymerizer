import {
    TokenType, IToken
} from 'chevrotain'

import 'chevrotain'

declare module 'chevrotain' {
    export interface MissmatchTokenErrorOptions {
        expected: TokenType;
        actual: IToken;
        previous: IToken;
        ruleName: string;
    }

    export interface NoViableAltErrorOptions {
        expectedPathsPerAlt: TokenType[][][];
        actual: IToken[];
        previous: IToken;
        ruleName: string;
    }

    export interface NotAllInputParsedErrorOptions {
        firstRedundant: IToken;
        ruleName: string;
    }
}
