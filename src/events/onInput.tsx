import { ButtonState, GameState } from "../enums";
import { AppContext } from "../models";
import { randomInt } from "../utilities";

///
export async function onInput(context: AppContext) {
    const { config, elementsHook, stateHook } = context;
    const { state, setState } = stateHook;
    if (!config.demoMode) {
        console.info("waiting for player input...");
        return;
    }

    console.info("waiting for DEMO input...");
    await elementsHook.demoWait();

    const activeButtons = elementsHook.guessButtons.filter(
        (x) => x.ref.current!.className === ButtonState.NORMAL,
    );
    // const spotButton = guessButtons[answerSpot].ref.current!;
    const spotButton =
        activeButtons[randomInt(0, activeButtons.length)].ref.current!;

    setState({
        ...state,
        guessValue: spotButton.value,
        gameState: GameState.RESULT,
    });
}
