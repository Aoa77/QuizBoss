import { ELEMENT } from "../constants/ELEMENT";
import { GuessButton } from "./GuessButton";
import { createXref } from "../../core/animation/dom/createXref";
import { QuizState } from "../models/QuizState";
import { Flow } from "../../core/flow/Flow";

export function GuessButtonArea() {
    ///
    const [state] = Flow.context<QuizState>();
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