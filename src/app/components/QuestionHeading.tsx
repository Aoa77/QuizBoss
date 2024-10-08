import { QuizState } from "../models/QuizState";
import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";

export function QuestionHeading(state: QuizState) {
    const [question] = createXref.headings(ELEMENT.question);

    return (
        <h2 id={question.id} ref={question.ref} className="hidden">
            {state.quizModule?.quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}



