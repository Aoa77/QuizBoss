import { AppContext, DemoMode, GameState } from "../app";
import { ButtonState } from "../elements";

///
export async function onInput(context: AppContext) {
    const { config, elements, states: stateController, time } = context;
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
