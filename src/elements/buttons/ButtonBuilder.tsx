import AppSettings from "../../app/AppSettings";
import { GameState } from "../../state/GameState";
import StateController from "../../state/StateController";
import ButtonElement from "./ButtonElement";
import ButtonElementRef from "./ButtonElementRef";
import { ButtonState } from "./ButtonState";

export default function ButtonBuilder(
    settings: AppSettings,
    states: StateController,
): ButtonElement[] {
    ///
    const { guessButtonCount } = settings;
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
