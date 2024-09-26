import { ButtonState } from "../models/ButtonState";
import { ELEMENT } from "../elements/ELEMENT";
import { useElementsButtons } from "../../core/hooks/useElementButtons";
import { Xelement } from "../../core/xobjs/Xelement";
import { getAppState } from "../functions/getAppState";
import { GameState } from "../models/GameState";

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
    const [state, setState] = getAppState();
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
