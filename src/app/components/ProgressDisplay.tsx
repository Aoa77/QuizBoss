import { createXref } from "../../core/animation/dom/createXref";
import { ELEMENT } from "../constants/ELEMENT";
import { QuizState } from "../models/QuizState";

export function ProgressDisplay(state: QuizState) {
    const [progressArea] = createXref.divs(ELEMENT.progressArea);
    const { currentItemIndex, totalItems } = state;

    return (
        <section
            id={progressArea.id}
            ref={progressArea.ref}
            className="progress hidden">
            {currentItemIndex + 1} <b>/</b> {totalItems}
        </section>
    );
}
