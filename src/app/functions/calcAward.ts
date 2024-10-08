import { xref } from "../../core/animation/dom/xref";

export function calcAward(wrongGuesses: number[]): number {
    const buttons = xref.buttons();
    return buttons.length - wrongGuesses.length - 1;
}
