import ASTType from "./ASTType";
import { ASTBaseTypes } from "./tstypes";

export default abstract class ASTNumericalType<PropT> extends ASTType<PropT> {

    public abstract get isAligned(): boolean;

    public abstract get bitwidth(): number;

    // Helper function
    protected static _isByteAligned(n: number) {
        return n % 8 === 0;
    }

}
