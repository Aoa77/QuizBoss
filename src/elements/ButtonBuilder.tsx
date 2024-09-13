import { StateController } from "../controllers";
import { ButtonState, GameState } from "../enums";
import { Config } from "../app";
import ButtonElement from "./ButtonElement";
import ButtonElementRef from "./ButtonElementRef";

export default function ButtonBuilder(
    config: Config,
    stateController: StateController,
): ButtonElement[] {
    ///
    const { guessButtonCount } = config;
    const { state, setState } = stateController;
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
