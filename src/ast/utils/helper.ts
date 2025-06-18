const ASTHelper = {
    minBits(n: number): number {
        if (n === 0) return 1;
        return Math.floor(Math.log2(Math.abs(n))) + 1;
    },

    isByteAligned(bits: number): boolean {
        return bits % 8 === 0;
    },

    padToByte(bits: number): number {
        return Math.ceil(bits / 8) * 8;
    }
}

export default ASTHelper;
