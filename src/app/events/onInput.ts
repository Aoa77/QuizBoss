import { getAppState }   from "../hooks/useAppState";
import { getXrefButtons }    from "../../core/elements/buttons";
import { wait }              from "../../core/animation/wait";
import { randomInt }         from "../../core/random/randomInt";
import { ButtonState }       from "../models/ButtonState";
import { DemoMode }          from "../models/DemoMode";
import { GameState }         from "../models/GameState";
import { TIME } from "../elements/waitTimes";

export async function onInput() {
    const [state, setState] = getAppState();
    const { settings } = state;
    const { demoMode } = settings;

    if (demoMode === DemoMode.OFF) {
        console.info("waiting for player input...");
        return;
    }

    console.info("waiting for DEMO input...");
    await wait(TIME.DEMO_INPUT_DELAY);

    const spotButton = doDemoInput(state.answerSpot, demoMode);
    setState({
        ...state,
        guessValue: spotButton.value,
        gameState: GameState.RESULT,
    });
}

function doDemoInput(answerSpot: number, demoMode: DemoMode) : HTMLButtonElement {
    const buttons = getXrefButtons();

    let spotButton = buttons[answerSpot];
    if (demoMode === DemoMode.RANDOM) {
        const activeButtons = buttons.filter(
            (button) => button.className === ButtonState.NORMAL,
        );
        spotButton = 
            activeButtons[randomInt(0, activeButtons.length)];
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
    return spotButton.ref.current!;
}
