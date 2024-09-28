import { AppState } from "../models/AppState";
import { ELEMENT } from "../constants/elements";
import { useElementHeadings } from "../../core/hooks/useElementHeadings";
import { DemoMode } from "../models/DemoMode";
import { useMemo } from "react";

export function TitleHeading(state: AppState) {
    ///
    const [title] = useElementHeadings(ELEMENT.title);

    const h1: JSX.Element = useMemo(() => {
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
    }, [
        title.id,
        title.ref,
        state.quizModule?.quizData?.title,
        state.settings.demoMode,
    ]);
    return h1;
}
