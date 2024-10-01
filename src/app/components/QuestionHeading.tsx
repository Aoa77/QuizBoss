import { AppState } from "../models/AppState";
import { ELEMENT } from "../animation/elements";
import { useElementHeadings } from "../../core/xelemental/useElementHeadings";

export function QuestionHeading(state: AppState) {
    const [question] = useElementHeadings(ELEMENT.question);

    return (
        <h2 id={question.id} ref={question.ref} className="hidden">
            {state.quizModule?.quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}



