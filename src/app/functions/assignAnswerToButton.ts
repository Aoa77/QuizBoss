import AppContext from "../AppContext";
import ButtonElement from "../elements/buttons/ButtonElement";
import { ButtonState } from "../models/ButtonState";
import QuizItem from "../models/QuizItem";

export default async function assignAnswerToButton(
    buttonIndex: number,
    item: QuizItem,
) {
    const elements = AppContext.buttons();
    const buttons = elements.map((el) => el.element);
    const spotButton = buttons[buttonIndex]!;
    spotButton.innerHTML = item.name;
    spotButton.value = item.key;
    spotButton.className = ButtonState.NORMAL;
}
