import { IToken } from "chevrotain";
import { InvalidType, NonStdSize, SizeTooSmall } from "@/ast/errors";
import Context from "@/ast/context";
import CEbuilder from "@/utils/snippet";
import { ASTType } from "./tstypes";
import { ASTExpTypes } from "../expression/types";

const Helper = {
    minBit: (n: number): number => {
        if (n === 0) return 1;
        return Math.floor(Math.log2(Math.abs(n))) + 1;
    },

    isLosslessCast: (from: ASTType<any>, to: ASTType<any>): boolean => {

        // not using if statements because they look messy and horrible.
        // refactor later if this becomes a pain to maintain
        // (what can possibly happen)
        switch(`${from.basetype}-${to.basetype}`){
            case `${ASTExpTypes.UINT}-${ASTExpTypes.INT}`:
                return from.props.size! < to.props.size!;

            case `${ASTExpTypes.INT}-${ASTExpTypes.INT}`:
            case `${ASTExpTypes.UINT}-${ASTExpTypes.UINT}`:
                return from.props.size! <= to.props.size!;

            case `${ASTExpTypes.BOOL}-${ASTExpTypes.BOOL}`: 
                return true;

            case `${ASTExpTypes.INT}-${ASTExpTypes.FLOAT}`:
                return (from.props.size! < to.props.frac!) && (to.props.sign === 1);

            case `${ASTExpTypes.UINT}-${ASTExpTypes.FLOAT}`:
                return from.props.size! <= to.props.frac!;

            case `${ASTExpTypes.FLOAT}-${ASTExpTypes.FLOAT}`:
                return (
                    (from.props.sign <= to.props.sign) && 
                    (from.props.exp <= to.props.exp) &&
                    (from.props.frac <= to.props.frac)
                )

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

        const isValidType = imgRes[0] ? Object.values(ASTExpTypes).includes(imgRes[0]) : false;

        exp.basetype = isValidType ? imgRes[0] as ASTExpTypes : ASTExpTypes.BAD_TYPE;

        if (isValidType) {
            switch (exp.basetype) {
                case ASTExpTypes.INT:
                case ASTExpTypes.UINT:
                    if (imgRes.length > 1){

                        imgRes[1] = imgRes[1]!.substring(0, imgRes[1]!.length-1);
                        exp.props.size = imgRes[1]==='auto' ? 32 : Number(imgRes[1]);

                        if (exp.basetype === ASTExpTypes.INT && exp.props.size < 2) {
                            Context.errors.push(CEbuilder(SizeTooSmall(ASTExpTypes.INT, exp.props.size, 2), token));
                        }

                        if (exp.basetype === ASTExpTypes.UINT && exp.props.size < 1) {
                            Context.errors.push(CEbuilder(SizeTooSmall(ASTExpTypes.UINT, exp.props.size, 1), token));
                        }

                    } else exp.props.size = 32;

                    if (!Helper.isStdSize(exp.props.size)) {
                        Context.warnings.push(CEbuilder(NonStdSize(exp.props.size), token));
                    }

                    exp.display = `${exp.basetype}<${exp.props.size}>`;
                break;

                case ASTExpTypes.BOOL: exp.display = 'bool'; break;

                default: throw new Error(`Type ${exp.basetype} was not implemented`);
            }

        } else {
            Context.errors.push(CEbuilder(InvalidType(image), token));
        }


        return exp;
    }
}

export default Helper;
