import { ButtonState } from "../models/ButtonState";
import { ELEMENT } from "../elements/constants";
import { useXrefButtons } from "../../core/elements/buttons";
import { Xref } from "../../core/elements/xref";
import { getAppStateFlow } from "../appFlow/useFlow";
import { GameState } from "../models/GameState";

export function GuessButton(params: { index: number }) {
    const [button] = useXrefButtons(`${ELEMENT.button}_${params.index}`);
    return (
        <button
            className={ButtonState.HIDDEN}
            id={button.id}
            key={button.id}
            onPointerDown={() => handleButtonPointerDown(button)}
            ref={button.ref}
            value={button.id}>
            {button.id}
        </button>
    );
}

async function handleButtonPointerDown(xref: Xref<HTMLButtonElement>) {
    const [state, setState] = getAppStateFlow();
    const { gameState } = state;
    if (gameState !== GameState.INPUT) {
        return;
    }
    if (xref.className !== ButtonState.NORMAL) {
        return;
    }
    setState({
        ...state,
        guessValue: xref.element.value,
        gameState: GameState.RESULT,
    });
}
