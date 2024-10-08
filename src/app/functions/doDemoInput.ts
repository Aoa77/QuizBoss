import { randomInt } from "../../core/util/randomInt";
import { Xelement } from "../../core/animation/dom/Xelement";
import { ButtonState } from "../models/ButtonState";
import { DemoMode } from "../models/DemoMode";
import { xref } from "../../core/animation/dom/xref";


export function doDemoInput(
    answerSpot: number,
    demoMode: DemoMode
): Xelement<HTMLButtonElement> {
    const buttons = xref.buttons();

    let spotButton = buttons[answerSpot];
    if (demoMode === DemoMode.RANDOM) {
        const activeButtons = buttons.filter(
            (button) => button.className === ButtonState.NORMAL
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






// export async function onInput() {
//     const [state, setState] = getStateFlow<AppState>();
//     const { settings } = state;
//     const { demoMode } = settings;
//     if (demoMode === DemoMode.OFF) {
//         //console.info("waiting for player input...");
//         //return;
//     }
//     console.info("waiting for DEMO input...");
//     const buttons = xref.buttons();
//     let index = 0;
//     while (true) {
//         if (index === buttons.length) {
//             index = 0;
//         }
//         const spotButton = buttons[index];//doDemoInput(state.answerSpot, demoMode);
//         spotButton.className = ButtonState.WRONG;
//         await wait(DELAY.DEMO_INPUT, 25);
//         await spotButton.runAnimation(scaleButtonBegin());
//         await wait(DELAY.DEMO_INPUT, 25);
//         await spotButton.runAnimation(scaleButtonEnd());
//         ++index;
//         spotButton.className = ButtonState.CORRECT;
//         continue;
//         setState({
//             ...state,
//             guessValue: spotButton.dataValue,
//             gameState: GameState.RESULT,
//         });
//     }
// }