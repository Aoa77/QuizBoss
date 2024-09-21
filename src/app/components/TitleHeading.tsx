import { useXref } from "../../core/hooks/useXref";
import { AppState } from "../appFlow/AppState";
import { ElementNames } from "../elements/ElementNames";

export default function TitleHeading(state: AppState) {
    ///
    const [title] = useXref<HTMLHeadingElement>({
        id: ElementNames.title,
    });
    
    return (
        <h1 id={title.id} ref={title.ref} className="hidden">
            {state.quizModule?.quizData?.title ?? <>&nbsp;</>}
        </h1>
    );
}
