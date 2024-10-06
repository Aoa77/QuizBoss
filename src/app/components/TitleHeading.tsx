import { AppState } from "../models/AppState";
import { ELEMENT } from "../animation/elements";
import { createElementHeadings } from "../../core/xelemental/createElementHeadings";
import { DemoMode } from "../models/DemoMode";

export function TitleHeading(state: AppState) {
    ///
    const [title] = createElementHeadings(ELEMENT.title);

    function onPointerDown() {
        if (state.settings.demoMode === DemoMode.OFF) {
            return;
        }
        window.location.reload();
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
