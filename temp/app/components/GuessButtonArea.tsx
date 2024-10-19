import { ELEMENT } from "../constants/ELEMENT";
import { GuessButton } from "./GuessButton";
import { createXref } from "../../core/animation/dom/createXref";
import { QuizState } from "../../../src/models/QuizState";
import { FlowContext } from "../../../src/libs/flow-context/FlowContext";

export function GuessButtonArea() {
    ///
    const [state] = FlowContext.context<QuizState>();
    const [buttonArea] = createXref.divs(ELEMENT.buttonArea);
    const buttons: JSX.Element[] = [];
    for (let i = 0; i < state.settings.guessButtonCount; i++) {
        buttons.push(<GuessButton index={i} key={i} />);
    }

    return (
        <section
            id={buttonArea.id}
            ref={buttonArea.ref}
            className="buttons">
            {buttons}
        </section>
    );
}
