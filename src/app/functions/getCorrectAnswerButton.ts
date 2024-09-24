import { getAppState } from "../hooks/useAppState";
import { getXrefButtons } from "../../core/elements/buttons";
import { Xref } from "../../core/elements/xref";

export function getCorrectAnswerButton(): Xref<HTMLButtonElement> {
    const [state] = getAppState();
    const { answerSpot } = state;
    const buttons = getXrefButtons();
    return buttons[answerSpot];
}
