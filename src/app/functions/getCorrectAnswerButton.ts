import { getAppStateFlow } from "../appFlow/useFlow";
import { getXrefButtons } from "../../core/elements/buttons";
import { Xref } from "../../core/elements/xref";

export function getCorrectAnswerButton(): Xref<HTMLButtonElement> {
    const [state] = getAppStateFlow();
    const { answerSpot } = state;
    const buttons = getXrefButtons();
    return buttons[answerSpot];
}
