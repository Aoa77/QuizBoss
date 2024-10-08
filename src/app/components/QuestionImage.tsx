import { QuizState, getCurrentItem } from "../models/QuizState";
import { ELEMENT } from "../animation/elements";
import { createXref } from "../../core/animation/dom/createXref";

export function QuestionImage(state: QuizState) {
    const [image] = createXref.divs(ELEMENT.image);

    return (
        <section id={image.id} ref={image.ref} className="image hidden">
            {getCurrentItem(state)?.imageJsx ?? <>&nbsp;</>}
        </section>
    );
}
