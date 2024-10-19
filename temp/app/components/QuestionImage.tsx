import "./QuestionImage.css";
import { QuizState, getCurrentItem } from "../../../src/models/QuizState";
import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";

export function QuestionImage(state: QuizState) {
    const [image] = createXref.divs(ELEMENT.questionImage);

    return (
        <section id={image.id} ref={image.ref}>
            {getCurrentItem(state)?.imageJsx ?? <>&nbsp;</>}
        </section>
    );
}
