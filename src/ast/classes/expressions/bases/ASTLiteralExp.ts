import { ASTConcreteType } from "../../types/tstypes";
import ASTExpression from "./ASTExpression";

type LiteralComps = {
    literal: object;
}

export default abstract class ASTLiteralExpression<CompT extends LiteralComps, TypeT extends ASTConcreteType> extends ASTExpression<CompT, TypeT> {}
