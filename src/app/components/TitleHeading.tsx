import { AppState } from "../models/AppState";
import { ELEMENT } from "../elements/ELEMENT";
import { useElementHeadings } from "../../core/hooks/useElementHeadings";

export function TitleHeading(state: AppState) {
    ///
    const [title] = useElementHeadings(ELEMENT.title);

    return (
        <h1 id={title.id} ref={title.ref} className="hidden">
            {state.quizModule?.quizData?.title ?? <>&nbsp;</>}
        </h1>
    );
}
