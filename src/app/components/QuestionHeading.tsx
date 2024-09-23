import { useXrefHeadings } from "../../core/elements/headings";
import { AppState } from "../appFlow/AppState";
import { ELEMENT } from "../elements/constants";

export default function QuestionHeading(state: AppState) {
    const [question] = useXrefHeadings(ELEMENT.question);

    return (
        <h2 id={question!.id} ref={question!.ref} className="hidden">
            {state.quizModule?.quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}
