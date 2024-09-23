import { useXrefHeadings } from "../../core/xrefs/headings";
import { AppState } from "../appFlow/AppState";
import { ElementNames } from "../elements/constants";

export default function TitleHeading(state: AppState) {
    ///
    const [title] = useXrefHeadings(ElementNames.title);
    
    return (
        <h1 id={title!.id} ref={title!.ref} className="hidden">
            {state.quizModule?.quizData?.title ?? <>&nbsp;</>}
        </h1>
    );
}
