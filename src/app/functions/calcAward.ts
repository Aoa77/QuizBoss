import { getElementButtons } from "../../core/xelemental/getElementButtons";

export function calcAward(wrongGuesses: number[]): number {
    const buttons = getElementButtons();
    return buttons.length - wrongGuesses.length - 1;
}
