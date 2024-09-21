import { useXref } from "../../core/hooks/useXref";
import { AppState, getCurrentItem } from "../appFlow/AppState";
import { ElementNames } from "../elements/ElementNames";

export default function QuestionImage(state: AppState) {
    const [image] = useXref<HTMLDivElement>({
        id: ElementNames.image,
    });

    return (
        <section id={image.id} ref={image.ref} className="image hidden">
            {getCurrentItem(state)?.imageJsx ?? <>&nbsp;</>}
        </section>
    );
}
