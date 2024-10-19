import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";
import { Xelement } from "../../core/animation/dom/Xelement";
import { FlowContext } from "../../../src/libs/flow-context/FlowContext";
import { QuizState } from "../../../src/models/QuizState";
import { ButtonStyle } from "../../../src/models/ButtonStyle";
import { EventName } from "../../../src/models/EventName";

export function GuessButton(params: { index: number }) {
    const [button] = createXref.buttons(`${ELEMENT.button}_${params.index}`);
    return (
        <button
            className={ButtonStyle.HIDDEN}
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
    if (state.eventName !== EventName.AwaitInput) {
        return;
    }
    if (xref.className !== ButtonStyle.NORMAL) {
        return;
    }
    setState({
        ...state,
        guessValue: xref.dataValue,
        eventName: EventName.ShowResult,
    });
}
