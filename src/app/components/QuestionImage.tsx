import { AppState, getCurrentItem } from "../models/AppState";
import { ELEMENT } from "./_ELEMENTS";
import { useElementDivs } from "../../core/hooks/useElementDivs";

export function QuestionImage(state: AppState) {
    const [image] = useElementDivs(ELEMENT.image);

    return (
        <section id={image.id} ref={image.ref} className="image hidden">
            {getCurrentItem(state)?.imageJsx ?? <>&nbsp;</>}
        </section>
    );
}
