import { QuizState } from "../models/QuizState";
import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";
import { DemoMode } from "../constants/DemoMode";

export function TitleHeading(state: QuizState) {
    ///
    const [title] = createXref.headings(ELEMENT.title);

    function onPointerDown() {
        if (window.location.hostname.endsWith("use.devtunnels.ms")) {
            window.location.reload();
        }
    }
    return (
        <h1
            id={title.id}
            ref={title.ref}
            className="hidden"
            onPointerDown={onPointerDown}>
            {state.quizModule?.quizData?.title ?? <>&nbsp;</>}
        </h1>
    );
}
