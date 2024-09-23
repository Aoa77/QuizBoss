import { useXrefDivs } from "../../core/xrefs/divs";
import { AppState } from "../appFlow/AppState";
import { ElementNames } from "../elements/constants";
import GuessButton from "./GuessButton";

export default function GuessButtonArea(state: AppState) {
    ///
    const [buttonArea] = useXrefDivs(ElementNames.buttonArea);
    const buttons = [state.settings.guessButtonCount];

    return (
        <section
            id={buttonArea!.id}
            ref={buttonArea!.ref}
            className="buttons hidden">
            {buttons.map((_button, index) => (
                <GuessButton index={index} />
            ))}
        </section>
    );
}
