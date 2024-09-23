import { useXrefDivs } from "../../core/xrefs/divs";
import { AppState, getCurrentItem } from "../appFlow/AppState";
import { ElementNames } from "../elements/constants";

export default function QuestionImage(state: AppState) {
    const [image] = useXrefDivs(ElementNames.image);

    return (
        <section id={image!.id} ref={image!.ref} className="image hidden">
            {getCurrentItem(state)?.imageJsx ?? <>&nbsp;</>}
        </section>
    );
}
