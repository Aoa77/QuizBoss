import { AppProps } from "../props";
import { ButtonState, GameState } from "../enums";
import { randomInt } from "../utilities/random";

///
export async function onInput(props: AppProps) {
    const { config, delay, guessButtons, state, setState } = props;
    if (!config.demoMode) {
        console.info("waiting for player input...");
        return;
    }

    console.info("waiting for DEMO input...");
    await delay.demoWait();

    const activeButtons = guessButtons.filter(
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
