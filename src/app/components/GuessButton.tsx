import { ButtonState } from "../models/ButtonState";
import { ELEMENT } from "../animation/elements";
import { useElementsButtons } from "../../core/xelemental/useElementButtons";
import { Xelement } from "../../core/xelemental/Xelement";
import { GameState } from "../models/GameState";
import { getStateFlow } from "../../core/state-flow/getStateFlow";
import { AppState } from "../models/AppState";

export function GuessButton(params: { index: number }) {
    const [button] = useElementsButtons(`${ELEMENT.button}_${params.index}`);
    return (
        <button
            className={ButtonState.HIDDEN}
            id={button.id}
            key={button.id}
            onPointerDown={() => handleButtonPointerDown(button)}
            data-value={button.id}
            ref={button.ref}>
            {button.id}
        </button>
    );
}

async function handleButtonPointerDown(xref: Xelement<HTMLButtonElement>) {
    const [state, setState] = getStateFlow<AppState>();
    const { gameState } = state;
    if (gameState !== GameState.INPUT) {
        return;
    }
    if (xref.className !== ButtonState.NORMAL) {
        return;
    }
    setState({
        ...state,
        guessValue: xref.dataValue,
        gameState: GameState.RESULT,
    });
}
