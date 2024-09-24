import { useXrefDivs } from "../../core/elements/divs";
import { AppState, getCurrentItem } from "../models/AppState";
import { ELEMENT } from "../elements/ELEMENT";

export function QuestionImage(state: AppState) {
    const [image] = useXrefDivs(ELEMENT.image);

    return (
        <section id={image.id} ref={image.ref} className="image hidden">
            {getCurrentItem(state)?.imageJsx ?? <>&nbsp;</>}
        </section>
    );
}
