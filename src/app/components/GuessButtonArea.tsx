import { ELEMENT } from "../animation/elements";
import { GuessButton } from "./GuessButton";
import { createXref } from "../../core/animation/dom/createXref";
import { flow } from "../../core/context/flow";
import { QuizState } from "../models/QuizState";

export function GuessButtonArea() {
    ///
    const [state] = flow<QuizState>();
    const [buttonArea] = createXref.divs(ELEMENT.buttonArea);
    const buttons: JSX.Element[] = [];
    for (let i = 0; i < state.settings.guessButtonCount; i++) {
        buttons.push(<GuessButton index={i} key={i} />);
    }

    return (
        <section
            id={buttonArea.id}
            ref={buttonArea.ref}
            className="buttons hidden">
            {buttons}
        </section>
    );
}
