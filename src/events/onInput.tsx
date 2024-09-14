import { AppContext, DemoMode, GameState } from "../app";
import { ButtonState } from "../buttons";
import { randomInt } from "../utilities";

export async function onInput(context: AppContext) {
    const { config, elements, states, time } = context;
    const { guessButtons } = elements;
    const { state, setState } = states;

    if (config.demoMode === DemoMode.OFF) {
        console.info("waiting for player input...");
        return;
    }

    console.info("waiting for DEMO input...");
    await time.demoWait();

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

    setState({
        ...state,
        guessValue: spotButton.value,
        gameState: GameState.RESULT,
    });
}
