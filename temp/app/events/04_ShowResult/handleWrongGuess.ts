import { xref } from "../../../core/animation/dom/xref";
import { ButtonState } from "../../../../src/models/ButtonState";
import { ButtonAnimation } from "../../animations/ButtonAnimation";

export async function handleWrongGuess(): Promise<void> {
    const wrongButton = xref.buttons().find(
        (x) => x.className === ButtonState.WRONG,
    )!;
    await ButtonAnimation.wrongGuessSequence(wrongButton);
}
