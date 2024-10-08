import { ButtonState } from "../models/ButtonState";
import { ELEMENT } from "../animation/elements";
import { createXref } from "../../core/animation/dom/createXref";
import { Xelement } from "../../core/animation/dom/Xelement";
import { EventState } from "../models/EventState";
import { flow } from "../../core/context/flow";
import { QuizState } from "../models/QuizState";

export function GuessButton(params: { index: number }) {
    const [button] = createXref.buttons(`${ELEMENT.button}_${params.index}`);
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
    const [state, setState] = flow<QuizState>();
    const { event: gameState } = state;
    if (gameState !== EventState.Input) {
        return;
    }
    if (xref.className !== ButtonState.NORMAL) {
        return;
    }
    setState({
        ...state,
        guessValue: xref.dataValue,
        event: EventState.ShowResult,
    });
}
