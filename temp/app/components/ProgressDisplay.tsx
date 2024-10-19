import { createXref } from "../../core/animation/dom/createXref";
import { ELEMENT } from "../constants/ELEMENT";
import { QuizState } from "../../../src/models/QuizState";

export function ProgressDisplay(state: QuizState) {
    const [progressArea] = createXref.divs(ELEMENT.progressArea);
    const { currentItemIndex, totalItems } = state;

    const totalItemsString = totalItems.toString();
    let currentItemString = (currentItemIndex + 1).toString();
    while (currentItemString.length < totalItemsString.length) {
        currentItemString = "0" + currentItemString;
    }

    return (
        <section
            id={progressArea.id}
            ref={progressArea.ref}
            className="progress hidden">
            {currentItemString} <b>/</b> {totalItemsString}
        </section>
    );
}
