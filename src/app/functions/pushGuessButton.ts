import { AppContext } from "../AppContext";
import { Xref } from "../../core/elements/Xref";
import { ButtonState } from "../models/ButtonState";
import { GameState } from "../models/GameState";


export async function pushGuessButton(
    xref: Xref<HTMLButtonElement | null>,
) {
    const el = xref.el();
    if (!el) {
        throw new Error(`pushGuessButton(): ${xref.target} is null`);
    }

    const appState = AppContext.appState();
    const [state, setState] = appState;
    const { gameState } = state;

    if (gameState !== GameState.INPUT) {
        return;
    }

    if (el.className !== ButtonState.NORMAL) {
        return;
    }

    setState({
        ...state,
        guessValue: el.value,
        gameState: GameState.RESULT,
    });
}
