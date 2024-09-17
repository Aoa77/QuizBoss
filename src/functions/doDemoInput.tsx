import AppContext from "../app/AppContext";
import AppSettings from "../app/AppSettings";
import { DemoMode } from "../app/DemoMode";
import { ButtonState } from "../elements/buttons/ButtonState";
import randomInt from "../random/randomInt";

export default function doDemoInput(context: AppContext) {
    const settings = AppSettings.get();
    const { elements, states } = context;
    const { guessButtons } = elements;
    const { state } = states;
    let spotButton = guessButtons[state.answerSpot].ref.current!;
    if (settings.demoMode === DemoMode.RANDOM) {
        const activeButtons = guessButtons.filter(
            (x) => x.ref.current!.className === ButtonState.NORMAL,
        );
        spotButton =
            activeButtons[randomInt(0, activeButtons.length)].ref.current!;
    } else if (settings.demoMode === DemoMode.WRONG) {
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
