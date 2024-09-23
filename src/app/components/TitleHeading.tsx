import { useXrefHeadings } from "../../core/elements/headings";
import { AppState } from "../appFlow/AppState";
import { ELEMENT } from "../elements/constants";

export default function TitleHeading(state: AppState) {
    ///
    const [title] = useXrefHeadings(ELEMENT.title);
    
    return (
        <h1 id={title!.id} ref={title!.ref} className="hidden">
            {state.quizModule?.quizData?.title ?? <>&nbsp;</>}
        </h1>
    );
}
