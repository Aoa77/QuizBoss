import ButtonElement from "../elements/buttons/ButtonElement";
import ElementController from "../elements/ElementController";
import State from "../state/State";
import delay from "../time/delay";
import { Duration } from "../time/Duration";
import { Multiplier } from "../time/Multiplier";
import applyScoreAward from "./applyScoreAward";
import calcAward from "./calcAward";
import revealButtonScore from "./revealButtonScore";


export default async function handleCorrectGuess(
    correctButton: ButtonElement,
    elements: ElementController,
    guessButtons: ButtonElement[],
    wrongGuesses: number[],
    state: State,
    // tasks: Promise<void>[]
): Promise<void> {
    //
    const { image, loading, question } = elements.refs;
    if (!correctButton) {
        throw new Error("correctButton is null.");
    }

    const wrongButtons = guessButtons.filter(
        (b) => b.target !== correctButton.target
    );

    const award: number = calcAward(guessButtons, wrongGuesses);
    await elements.scaleIn(correctButton.target);
    await delay(Duration.WAIT, Multiplier.x3);
    revealButtonScore(award, correctButton.ref.current!);

    await elements.fadeOut(question.target);
    await applyScoreAward(award, state, elements);
    for (const button of wrongButtons) {
        await elements.fadeOut(button.target);
    }

    await delay(Duration.WAIT, Multiplier.x2);
    await elements.scaleOut(correctButton.target);
    await elements.fadeOut(image.target);

    await elements.fadeIn(loading.target);
    await elements.fadeOut(correctButton.target);
}
