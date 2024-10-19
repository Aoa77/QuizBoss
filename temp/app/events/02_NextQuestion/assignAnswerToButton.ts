import { xref } from "../../../core/animation/dom/xref";
import { ButtonState } from "../../constants/ButtonState";
import { QuizItem } from "../../../../src/models/QuizItem";

export async function assignAnswerToButton(
    buttonIndex: number,
    item: QuizItem,
) {
    const buttons = xref.buttons();
    const spotButton = buttons[buttonIndex];
    spotButton.innerHTML = item.name;
    spotButton.dataValue = item.key;
    spotButton.className = ButtonState.NORMAL;
}
