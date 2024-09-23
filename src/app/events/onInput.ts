import { getAppStateFlow } from "../appFlow/useAppStateFlow";
import { TIME } from "../elements/constants";
import { ButtonState } from "../models/ButtonState";
import { DemoMode } from "../models/DemoMode";
import { GameState } from "../models/GameState";
import wait from "../../core/timing/wait";
import randomInt from "../../core/random/randomInt";
import { getXrefButtons } from "../../core/xrefs/buttons";

export default async function onInput() {
    const [state, setState] = getAppStateFlow();
    const { settings } = state;
    const { demoMode } = settings;

    if (demoMode === DemoMode.OFF) {
        console.info("waiting for player input...");
        return;
    }

    console.info("waiting for DEMO input...");
    await wait({ duration: TIME.DEMO });

    const spotButton = doDemoInput(state.answerSpot, demoMode);
    setState({
        ...state,
        guessValue: spotButton.value,
        gameState: GameState.RESULT,
    });
}

function doDemoInput(answerSpot: number, demoMode: DemoMode) {
    const buttons = getXrefButtons();

    let spotButton = buttons[answerSpot]!.element!;
    if (demoMode === DemoMode.RANDOM) {
        const activeButtons = buttons.filter(
            (button) => button!.element!.className === ButtonState.NORMAL,
        );
        spotButton =
            activeButtons[randomInt(0, activeButtons.length)]!.element!;
    } else if (demoMode === DemoMode.WRONG) {
        for (let i = 0; i < buttons.length; i++) {
            if (i === answerSpot) {
                continue;
            }
            spotButton = buttons[i]!.element!;
            if (spotButton.className === ButtonState.NORMAL) {
                break;
            }
        }
    }
    return spotButton;
}
