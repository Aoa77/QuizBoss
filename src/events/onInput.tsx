import { ContextController } from "../controllers";
import { ButtonState, DemoMode, GameState } from "../enums";
import { randomInt } from "../utilities";

///
export async function onInput(context: ContextController) {
    const { config, elements, stateController, time } = context;
    const { guessButtons } = elements;
    const { state, setState } = stateController;

    if (config.demoMode === DemoMode.OFF) {
        console.info("waiting for player input...");
        return;
    }

    console.info("waiting for DEMO input...");
    await time.demoWait();

    const activeButtons = guessButtons.filter(
        (x) => x.ref.current!.className === ButtonState.NORMAL,
    );

    let spotButton = guessButtons[state.answerSpot].ref.current!;
    // // const spotButton =
    // const spotButton =
    //     activeButtons[randomInt(0, activeButtons.length)].ref.current!;

    setState({
        ...state,
        guessValue: spotButton.value,
        gameState: GameState.RESULT,
    });
}
