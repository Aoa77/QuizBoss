import { useXref } from "../../core/hooks/useXref";
import { AppState } from "../appFlow/AppState";
import { ElementNames } from "../elements/ElementNames";

export default function QuestionHeading(state: AppState) {
    const [question] = useXref<HTMLHeadingElement>({
        id: ElementNames.question,
    });

    return (
        <h2 id={question.id} ref={question.ref} className="hidden">
            {state.quizModule?.quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}
