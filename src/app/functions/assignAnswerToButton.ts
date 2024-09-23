import { getXrefButtons } from "../../core/elements/buttons";
import { ButtonState } from "../models/ButtonState";
import { QuizItem } from "../models/QuizItem";

export async function assignAnswerToButton(
    buttonIndex: number,
    item: QuizItem,
) {
    const buttons = getXrefButtons();
    const spotButton = buttons[buttonIndex]!;
    spotButton.innerHTML = item.name;
    spotButton.element.value = item.key;
    spotButton.className = ButtonState.NORMAL;
}
