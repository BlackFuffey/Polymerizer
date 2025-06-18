import { IToken } from "chevrotain";
import ASTType from "../bases/ASTType";
import { ASTBaseTypes } from "../tstypes";

export default class ASTBooleanType extends ASTType<never> {
    protected override readonly _basetype = ASTBaseTypes.BOOL;

    public static fromCstToken(token: IToken): ASTBooleanType | null {
        return token.image === 'bool' ? 
            new ASTBooleanType({ props: undefined as never }) :
            null
    }

    public override get display(): string {
        return 'bool';
    }

    public override get isValid(): boolean {
        return true;        
    }

    public override isCastableTo(type: ASTType<object>): boolean {
        return type.basetype === ASTBaseTypes.BOOL;
    }
}
