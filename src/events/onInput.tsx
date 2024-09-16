import AppContext from "../app/AppContext";
import { DemoMode } from "../app/DemoMode";
import { ButtonState } from "../elements/buttons/ButtonState";
import randomInt from "../random/randomInt";
import { GameState } from "../state/GameState";
import delay from "../time/delay";
import { Duration } from "../time/Duration";

export async function onInput(context: AppContext) {
    const { config, elements, states } = context;
    const { guessButtons } = elements;
    const { state, setState } = states;

    if (config.demoMode === DemoMode.OFF) {
        console.info("waiting for player input...");
        return;
    }

    console.info("waiting for DEMO input...");
    await delay(Duration.DEMO);

    const spotButton = doDemoInput();
    setState({
        ...state,
        guessValue: spotButton.value,
        gameState: GameState.RESULT,
    });
    return;

    function doDemoInput() {
        let spotButton = guessButtons[state.answerSpot].ref.current!;
        if (config.demoMode === DemoMode.RANDOM) {
            const activeButtons = guessButtons.filter(
                (x) => x.ref.current!.className === ButtonState.NORMAL,
            );
            spotButton =
                activeButtons[randomInt(0, activeButtons.length)].ref.current!;
        } else if (config.demoMode === DemoMode.WRONG) {
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
}
