import { QuizState, getCurrentItem } from "../models/QuizState";
import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";

export function QuestionImage(state: QuizState) {
    const [image] = createXref.divs(ELEMENT.questionImage);

    return (
        <section id={image.id} ref={image.ref} className="image hidden">
            {getCurrentItem(state)?.imageJsx ?? <>&nbsp;</>}
        </section>
    );
}
