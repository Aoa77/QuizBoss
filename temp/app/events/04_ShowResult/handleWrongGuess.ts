import { xref } from "../../../core/animation/dom/xref";
import { ButtonStyle } from "../../../../src/models/ButtonStyle";
import { ButtonAnimation } from "../../animations/ButtonAnimation";

export async function handleWrongGuess(): Promise<void> {
    const wrongButton = xref.buttons().find(
        (x) => x.className === ButtonStyle.WRONG,
    )!;
    await ButtonAnimation.wrongGuessSequence(wrongButton);
}
