import { getAppState } from "./getAppState";
import { getElementButtons } from "../../core/functions/getElementButtons";
import { Xelement } from "../../core/xobjs/Xelement";

export function getCorrectAnswerButton(): Xelement<HTMLButtonElement> {
    const [state] = getAppState();
    const { answerSpot } = state;
    const buttons = getElementButtons();
    return buttons[answerSpot];
}
