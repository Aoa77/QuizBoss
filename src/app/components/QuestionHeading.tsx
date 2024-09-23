import { useXrefHeadings } from "../../core/xrefs/headings";
import { AppState } from "../appFlow/AppState";
import { ElementNames } from "../elements/constants";

export default function QuestionHeading(state: AppState) {
    const [question] = useXrefHeadings(ElementNames.question);

    return (
        <h2 id={question!.id} ref={question!.ref} className="hidden">
            {state.quizModule?.quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}
