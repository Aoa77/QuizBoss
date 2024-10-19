import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";

export function QuestionHeading(props: { questionText: string }) {
    ///
    const [question] = createXref.divs(ELEMENT.question);
    return (
        <div id={question.id} ref={question.ref}>
            <section>{props.questionText}</section>
        </div>
    );
}
