import { createToken } from "chevrotain";

export const Exit = createToken({ name: "Exit", pattern: /\bexit\b/})

export const If = createToken({ name: "If", pattern: /\bif\b/});

export const Else = createToken({ name: "Else", pattern: /\belse\b/});

