import "./QuestionImage.css";
import { QuizState, currentQuizItem } from "../../../src/models/QuizState";
import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";

export function QuestionImage(state: QuizState) {
    const [image] = createXref.divs(ELEMENT.questionImage);

    return (
        <section id={image.id} ref={image.ref}>
            {currentQuizItem(state)?.imageJsx ?? <>&nbsp;</>}
        </section>
    );
}
