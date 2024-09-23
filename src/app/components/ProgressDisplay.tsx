import { useXrefDivs } from "../../core/elements/divs";
import { AppState } from "../appFlow/AppState";
import { ELEMENT } from "../elements/constants";

export function ProgressDisplay(state: AppState) {
    const [progress] = useXrefDivs(ELEMENT.progress);

    const { currentItemIndex, totalItems } = state;

    return (
        <section
            id={progress!.id}
            ref={progress!.ref}
            className="progress hidden">
            <span className="current">{currentItemIndex + 1}</span>
            <span>/</span>
            <span className="total">{totalItems}</span>
        </section>
    );
}
