import AppContext from "../../app/AppContext";
import { GameState } from "../../state/GameState";
import ButtonElement from "./ButtonElement";
import ButtonElementRef from "./ButtonElementRef";
import { ButtonState } from "./ButtonState";

export default function ButtonBuilder(): ButtonElement[] {
    ///
    const settings = AppContext.settings();
    const { guessButtonCount } = settings;

    const onPointerDown: (
        ref: React.RefObject<HTMLButtonElement>, ////
    ) => void = (clickedButtonRef) => {
        const appState = AppContext.appState();
        const { state, setState } = appState;
        const { gameState } = state;
        console.info({ gameState });
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
