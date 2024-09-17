import ButtonElement from "../elements/buttons/ButtonElement";
import { ButtonState } from "../elements/buttons/ButtonState";
import ElementController from "../elements/ElementController";
import delay from "../time/delay";
import { Duration } from "../time/Duration";


export default async function handleWrongGuess(
    guessButtons: ButtonElement[],
    elements: ElementController,
    tasks: Promise<void>[]
): Promise<void> {
    const wrongButton: ButtonElement = guessButtons.find(
        (b) => b.ref.current!.className === ButtonState.WRONG
    )!;

    await elements.scaleIn(wrongButton.target);
    await delay(Duration.WAIT);
    tasks.push(elements.scaleOut(wrongButton.target));
}
