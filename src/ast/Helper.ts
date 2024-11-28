import { IToken } from "chevrotain";
import { ASTExpTypes, ASTType } from "./types.js";
import extractSnippet from "../utils/snippet.js";
import { InvalidType, NonStdSize, SizeTooSmall } from "./errors.js";
import { CompileError } from "../types.js";
import Context from "./Context.js";

const Helper = {
    minBit: (n: number): number => {
        console.log(`n: ${n}  is0: ${n===0}`);
        if (n === 0) return 1;
        return Math.floor(Math.log2(Math.abs(n))) + 1;
    },

    isLosslessCast: (from: ASTType<any>, to: ASTType<any>): boolean => {
        const match = `${from.basetype}-${to.basetype}`;

        switch(match){
            case `${ASTExpTypes.INT}-${ASTExpTypes.UINT}`:
                return false;

            case `${ASTExpTypes.UINT}-${ASTExpTypes.INT}`:
                return from.props.size! < to.props.size!;

            case `${ASTExpTypes.INT}-${ASTExpTypes.INT}`:
                case `${ASTExpTypes.UINT}-${ASTExpTypes.UINT}`:
                return from.props.size! <= to.props.size!;

            case `${ASTExpTypes.BOOL}-${ASTExpTypes.BOOL}`: return true;

            default: return false;
        }
    },

    isStdSize: (size: number): boolean => {
        return size % 8 === 0;
    },

    typeTokenToASTType: (token: IToken): ASTType<any> => {
        const { image } = token;

        let imgRes = image.split("<")
        let exp: ASTType<any> = { basetype: ASTExpTypes.BAD_TYPE, display: '', props: {} };

        const isValidType = Object.values(ASTExpTypes).includes(imgRes[0]);

        // @ts-ignore       isValidType ensures imgRes[0] to be a valid ASTExpTypes member
        exp.basetype = isValidType ? imgRes[0] : ASTExpTypes.BAD_TYPE;

        if (isValidType) {
            switch (exp.basetype) {
                case ASTExpTypes.INT:
                case ASTExpTypes.UINT:
                    if (imgRes.length > 1){

                        imgRes[1] = imgRes[1].substring(0, imgRes[1].length-1);
                        exp.props.size = imgRes[1]==='auto' ? 32 : Number(imgRes[1]);

                        if (exp.basetype === ASTExpTypes.INT && exp.props.size < 2) {
                            Context.errors.push({
                                header: SizeTooSmall(ASTExpTypes.INT, exp.props.size, 2),
                                ...extractSnippet(
                                    token.startOffset,
                                    token.endOffset || token.startOffset
                                ),
                                line: token.startLine || NaN,
                                column: token.endLine || NaN
                            })
                        }

                        if (exp.basetype === ASTExpTypes.UINT && exp.props.size < 1) {
                            Context.errors.push({
                                header: SizeTooSmall(ASTExpTypes.UINT, exp.props.size, 1),
                                ...extractSnippet(
                                    token.startOffset,
                                    token.endOffset || token.startOffset
                                ),
                                line: token.startLine || NaN,
                                column: token.endLine || NaN
                            })
                        }

                    } else exp.props.size = 32;

                    if (!Helper.isStdSize(exp.props.size)) {
                        Context.warns.push({
                            header: NonStdSize(exp.props.size),
                            ...extractSnippet(
                                token.startOffset,
                                token.endOffset || token.startOffset
                            ),
                            line: token.startLine || NaN,
                            column: token.endLine || NaN
                        })
                    }

                    exp.display = `${exp.basetype}<${exp.props.size}>`;
                break;

                case ASTExpTypes.BOOL: exp.display = 'bool'; break;

                default: throw new Error(`Type ${exp.basetype} was not implemented`);
            }

        } else {
            Context.errors.push({
                header: InvalidType(image),
                ...extractSnippet(
                    token.startOffset,
                    token.endOffset || token.startOffset
                ),
                line: token.startLine || -1,
                column: token.endLine || -1
            }); 
        }


        return exp;
    }
}

export default Helper;
