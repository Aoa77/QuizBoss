import { xref } from "../../../core/animation/dom/xref";
import { ButtonState } from "../../constants/ButtonState";
import { GuessButton } from "../../elements/GuessButton";

export async function handleWrongGuess(): Promise<void> {
    const wrongButton = xref.buttons().find(
        (x) => x.className === ButtonState.WRONG,
    )!;
    await GuessButton.wrongGuessSequence(wrongButton);
}
