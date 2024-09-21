import ButtonElement from "../elements/buttons/ButtonElement";
import { ButtonState } from "../models/ButtonState";
import ElementController from "../elements/__ElementController";
import wait from "../../core/timing/wait";
import { Duration } from "../elements/fade";


export default async function handleWrongGuess(
    guessButtons: ButtonElement[],
    elements: ElementController,
    // tasks: Promise<void>[]
): Promise<void> {
    const wrongButton: ButtonElement = guessButtons.find(
        (b) => b.ref.current!.className === ButtonState.WRONG
    )!;

    await elements.scaleIn(wrongButton.target);
    await wait(Duration.WAIT);
    await elements.scaleOut(wrongButton.target);
}
