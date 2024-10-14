import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";

export function QuestionHeading(props: { questionText: string }) {
    ///
    const [question] = createXref.headings(ELEMENT.question);
    return (
        <h2 id={question.id} ref={question.ref} className="hidden">
            {props.questionText}
        </h2>
    );
}



