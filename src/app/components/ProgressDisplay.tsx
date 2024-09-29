import { AppState } from "../models/AppState";
import { ELEMENT } from "../animation/elements";
import { useElementDivs } from "../../core/hooks/useElementDivs";

export function ProgressDisplay(state: AppState) {
    const [progress] = useElementDivs(ELEMENT.progress);

    const { currentItemIndex, totalItems } = state;

    return (
        <section
            id={progress.id}
            ref={progress.ref}
            className="progress hidden">
            <span className="current">{currentItemIndex + 1}</span>
            <span>/</span>
            <span className="total">{totalItems}</span>
        </section>
    );
}
