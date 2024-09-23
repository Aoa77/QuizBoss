import { getXrefButtonElements } from "../../core/elements/buttons";
import { ButtonState } from "../models/ButtonState";
import QuizItem from "../models/QuizItem";

export default async function assignAnswerToButton(
    buttonIndex: number,
    item: QuizItem,
) {
    const [buttons] = getXrefButtonElements();
    const spotButton = buttons[buttonIndex]!;
    spotButton.innerHTML = item.name;
    spotButton.value = item.key;
    spotButton.className = ButtonState.NORMAL;
}
