import { AppState } from "../models/AppState";
import { ELEMENT } from "../animation/elements";
import { createElementHeadings } from "../../core/xelemental/createElementHeadings";

export function QuestionHeading(state: AppState) {
    const [question] = createElementHeadings(ELEMENT.question);

    return (
        <h2 id={question.id} ref={question.ref} className="hidden">
            {state.quizModule?.quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}



