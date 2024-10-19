import { randomInt } from "../../../core/util/randomInt";
import { Xelement } from "../../../core/animation/dom/Xelement";
import { xref } from "../../../core/animation/dom/xref";
import { ButtonState } from "../../../../src/models/ButtonState";
import { DemoMode } from "../../../../src/models/DemoMode";

export function doDemoInput(
    answerSpot: number,
    demoMode: DemoMode,
): Xelement<HTMLButtonElement> {
    const buttons = xref.buttons();

    let spotButton = buttons[answerSpot];
    if (demoMode === DemoMode.RANDOM) {
        const activeButtons = buttons.filter(
            (button) => button.className === ButtonState.NORMAL,
        );
        spotButton = activeButtons[randomInt(0, activeButtons.length)];
    } else if (demoMode === DemoMode.WRONG) {
        for (let i = 0; i < buttons.length; i++) {
            if (i === answerSpot) {
                continue;
            }
            spotButton = buttons[i];
            if (spotButton.className === ButtonState.NORMAL) {
                break;
            }
        }
    }
    return spotButton;
}
