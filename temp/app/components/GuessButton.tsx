import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";
import { Xelement } from "../../core/animation/dom/Xelement";
import { EventState } from "../constants/EventState";
import { FlowContext } from "../../../src/context/FlowContext";
import { QuizState } from "../../../src/models/QuizState";
import { ButtonState } from "../../../src/models/ButtonState";

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
    const [state, setState] = FlowContext.context<QuizState>();
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
