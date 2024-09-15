import { AppConfig } from "../app";
import { StateController, GameState } from "../state";
import { ButtonElement, ButtonElementRef, ButtonState } from ".";

export default function ButtonBuilder(
    config: AppConfig,
    states: StateController,
): ButtonElement[] {
    ///
    const { guessButtonCount } = config;
    const { state, setState } = states;
    const { gameState } = state;

    const onPointerDown: (ref: React.RefObject<HTMLButtonElement>) => void = (
        clickedButtonRef,
    ) => {
        if (gameState !== GameState.INPUT) {
            return;
        }
        const clickedButton = clickedButtonRef.current!;
        if (clickedButton.className !== ButtonState.NORMAL) {
            return;
        }
        setState({
            ...state,
            guessValue: clickedButton.value,
            gameState: GameState.RESULT,
        });
    };

    const buttons: ButtonElement[] = [];
    for (let i = 0; i < guessButtonCount; i++) {
        buttons.push(ButtonElementRef(i, onPointerDown));
    }
    return buttons;
}
