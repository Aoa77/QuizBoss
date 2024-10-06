import { AppState, getCurrentItem } from "../models/AppState";
import { ELEMENT } from "../animation/elements";
import { createElementDivs } from "../../core/xelemental/createElementDivs";

export function QuestionImage(state: AppState) {
    const [image] = createElementDivs(ELEMENT.image);

    return (
        <section id={image.id} ref={image.ref} className="image hidden">
            {getCurrentItem(state)?.imageJsx ?? <>&nbsp;</>}
        </section>
    );
}
