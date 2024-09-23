import { useXrefDivs } from "../../core/xrefs/divs";
import { AppState } from "../appFlow/AppState";
import { ElementNames } from "../elements/constants";

export default function ProgressDisplay(state: AppState) {
    const [progress] = useXrefDivs(ElementNames.progress);

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
