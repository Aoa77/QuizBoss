import ButtonElement from "../elements/buttons/ButtonElement";
import { ButtonState } from "../elements/buttons/ButtonState";
import QuizItem from "../state/QuizItem";

export default async function assignAnswerToButton(
    buttonIndex: number,
    guessButtons: ButtonElement[],
    item: QuizItem,
) {
    const spotButton = guessButtons[buttonIndex].ref.current!;
    spotButton.innerHTML = item.name;
    spotButton.value = item.key;
    spotButton.className = ButtonState.NORMAL;
}
