import { AppState } from "../models/AppState";
import { ELEMENT } from "../constants/elements";
import { useElementHeadings } from "../../core/hooks/useElementHeadings";

export function QuestionHeading(state: AppState) {
    const [question] = useElementHeadings(ELEMENT.question);

    return (
        <h2 id={question.id} ref={question.ref} className="hidden">
            {state.quizModule?.quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}



