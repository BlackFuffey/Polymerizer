import { createToken } from "chevrotain";

export const OverrideAll = createToken({ name: "OverrideAll" });

export const Comments = createToken({ name: "Comments" });

export const Keywords = createToken({ name: "Keywords" });

export const Operators = createToken({ name: "Operators" });

export const Literals = createToken({ name: "Literals" });

export const Identifiers = createToken({ name: "Identifiers" });

export const Whitespaces = createToken({ name: "Whitespaces" });

export const byImportance = [ Comments, Literals, Keywords, Operators, Identifiers, Whitespaces ]
