import { getElementButtons } from "../../core/xelemental/getElementButtons";
import { randomInt } from "../../core/random-fx/randomInt";
import { Xelement } from "../../core/xelemental/Xelement";
import { ButtonState } from "../models/ButtonState";
import { DemoMode } from "../models/DemoMode";


export function doDemoInput(
    answerSpot: number,
    demoMode: DemoMode
): Xelement<HTMLButtonElement> {
    const buttons = getElementButtons();

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
//     const [state, setState] = getAppState();
//     const { settings } = state;
//     const { demoMode } = settings;
//     if (demoMode === DemoMode.OFF) {
//         //console.info("waiting for player input...");
//         //return;
//     }
//     console.info("waiting for DEMO input...");
//     const buttons = getElementButtons();
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