import { useXrefDivs } from "../../core/elements/divs";
import { AppState, getCurrentItem } from "../appFlow/AppState";
import { ELEMENT } from "../elements/constants";

export default function QuestionImage(state: AppState) {
    const [image] = useXrefDivs(ELEMENT.image);

    return (
        <section id={image!.id} ref={image!.ref} className="image hidden">
            {getCurrentItem(state)?.imageJsx ?? <>&nbsp;</>}
        </section>
    );
}
