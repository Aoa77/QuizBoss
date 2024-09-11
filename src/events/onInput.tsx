import { AppContext } from "../context";
import { ButtonState, GameState } from "../enums";
import { randomInt } from "../utilities";

///
export async function onInput(context: AppContext) {
    const { config, elementContext, stateContext } = context;
    const { state, setState } = stateContext;
    if (!config.demoMode) {
        console.info("waiting for player input...");
        return;
    }

    console.info("waiting for DEMO input...");
    await elementContext.demoWait();

    const activeButtons = elementContext.guessButtons.filter(
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
