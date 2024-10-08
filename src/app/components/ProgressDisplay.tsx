import { QuizState } from "../models/QuizState";
import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";

export function ProgressDisplay(state: QuizState) {
    const [progress] = createXref.divs(ELEMENT.progress);

    const { currentItemIndex, totalItems } = state;

    return (
        <section
            id={progress.id}
            ref={progress.ref}
            className="progress hidden">
            <span className="current">{currentItemIndex + 1}</span>
            <span>/</span>
            <span className="total">{totalItems}</span>
        </section>
    );
}
