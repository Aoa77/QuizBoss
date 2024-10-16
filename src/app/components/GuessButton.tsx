import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";
import { Xelement } from "../../core/animation/dom/Xelement";
import { EventState } from "../constants/EventState";
import { flow } from "../../core/context/flow";
import { QuizState } from "../models/QuizState";
import { ButtonState } from "../constants/ButtonState";

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
    if (state.event !== EventState.AwaitInput) {
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
