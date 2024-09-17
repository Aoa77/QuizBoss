import ButtonElement from "../elements/buttons/ButtonElement";
import ElementController from "../elements/ElementController";
import State from "../state/State";

export default function getCorrectAnswerButton(
    elements: ElementController,
    state: State,
): ButtonElement {
    const { guessButtons } = elements;
    const { answerSpot } = state;
    return guessButtons[answerSpot];
}
