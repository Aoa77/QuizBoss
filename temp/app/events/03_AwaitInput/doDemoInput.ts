import { randomInt } from "../../../../src/utils/randomInt";
import { Xelement } from "../../../core/animation/dom/Xelement";
import { xref } from "../../../core/animation/dom/xref";
import { ButtonStyle } from "../../../../src/models/ButtonStyle";
import { DemoMode } from "../../../../src/models/DemoMode";

export function doDemoInput(
    answerSpot: number,
    demoMode: DemoMode,
): Xelement<HTMLButtonElement> {
    const buttons = xref.buttons();

    let spotButton = buttons[answerSpot];
    if (demoMode === DemoMode.RANDOM) {
        const activeButtons = buttons.filter(
            (button) => button.className === ButtonStyle.NORMAL,
        );
        spotButton = activeButtons[randomInt(0, activeButtons.length)];
    } else if (demoMode === DemoMode.WRONG) {
        for (let i = 0; i < buttons.length; i++) {
            if (i === answerSpot) {
                continue;
            }
            spotButton = buttons[i];
            if (spotButton.className === ButtonStyle.NORMAL) {
                break;
            }
        }
    }
    return spotButton;
}
