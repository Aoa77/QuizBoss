import { useXrefHeadings } from "../../core/elements/headings";
import { AppState } from "../models/AppState";
import { ELEMENT } from "../elements/ELEMENT";

export function TitleHeading(state: AppState) {
    ///
    const [title] = useXrefHeadings(ELEMENT.title);
    
    return (
        <h1 id={title.id} ref={title.ref} className="hidden">
            {state.quizModule?.quizData?.title ?? <>&nbsp;</>}
        </h1>
    );
}
