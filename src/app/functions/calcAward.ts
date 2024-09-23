import { getXrefButtons } from "../../core/elements/buttons";

export function calcAward(wrongGuesses: number[]): number {
    const buttons = getXrefButtons();
    return buttons.length - wrongGuesses.length - 1;
}
