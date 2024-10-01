import { getElementButtons } from "../../core/xelemental/getElementButtons";
import { ButtonState } from "../models/ButtonState";
import { QuizItem } from "../models/QuizItem";

export async function assignAnswerToButton(
    buttonIndex: number,
    item: QuizItem,
) {
    const buttons = getElementButtons();
    const spotButton = buttons[buttonIndex];
    spotButton.innerHTML = item.name;
    spotButton.dataValue = item.key;
    spotButton.className = ButtonState.NORMAL;
}
