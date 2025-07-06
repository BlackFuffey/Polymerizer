import ASTNumericalType from "../bases/ASTNumericalType";
import ASTType from "../bases/ASTType";
import { ASTBaseTypes, ASTStaticType } from "../tstypes";

type FloatTypeProps = {
    signed: boolean,
    exp: number,
    frac: number,
}

export default class ASTFloatType extends ASTNumericalType<FloatTypeProps> {
    protected override readonly _basetype = ASTBaseTypes.FLOAT;

    public override get display(): string {
        const { signed, exp, frac } = this.props;

        return `float<${signed ? 1 : 0},${exp},${frac}>`;
    }

    public override get isValid(): boolean {
        const { exp, frac } = this.props;

        return exp >= 1 && frac >= 1
    }

    public get isAligned() {
        return ASTNumericalType._isByteAligned(this.bitwidth);
    }

    public get bitwidth() {
        const { signed, exp, frac } = this.props;
        return (signed ? 1 : 0) + exp + frac
    }

    public override isCastableTo(type: ASTType<object>): boolean {
        const from = this.props;
        
        switch (type.basetype) {
            case ASTBaseTypes.FLOAT:
                const to = (type as ASTFloatType).props;
            /*
             *  FROM           TO        CASTABLE
             * signed    ->   unsigned    no
             * unsigned  ->   signed      yes
             * signed    ->   signed      yes
             * unsigned  ->   unsigned    yes
             *
             * Only the first case is not castable, so
             * we check specificly for that.
             */
                return (
                    (from.signed && !to.signed ? false : true) &&
                    from.frac <= to.frac &&
                    from.exp <= to.exp
                );

            default: return false;
        }
    }

    public override toStaticObject(): ASTStaticType {
        const { signed, exp, frac } = this.props;
        return {
            basetype: this.basetype,
            display: `float<${Number(signed)},${exp},${frac}>`,
            props: this.props
        }
    }

}
