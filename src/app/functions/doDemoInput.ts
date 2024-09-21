import AppContext from "../AppContext";
import { DemoMode } from "../models/DemoMode";
import { ButtonState } from "../models/ButtonState";
import randomInt from "../../core/random/randomInt";

export default function doDemoInput() {
    const appState = AppContext.appState();
    const { state } = appState;

    const elements = AppContext.elements();
    const { guessButtons } = elements;
    
    const settings = AppContext.settings();
    const { demoMode } = settings;


    let spotButton = guessButtons[state.answerSpot].ref.current!;
    if (demoMode === DemoMode.RANDOM) {
        const activeButtons = guessButtons.filter(
            (x) => x.ref.current!.className === ButtonState.NORMAL,
        );
        spotButton =
            activeButtons[randomInt(0, activeButtons.length)].ref.current!;
    } else if (demoMode === DemoMode.WRONG) {
        for (let i = 0; i < guessButtons.length; i++) {
            if (i === state.answerSpot) {
                continue;
            }
            spotButton = guessButtons[i].ref.current!;
            if (spotButton.className === ButtonState.NORMAL) {
                break;
            }
        }
    }
    return spotButton;
}
