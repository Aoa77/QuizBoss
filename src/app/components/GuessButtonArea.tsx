import { useXrefDivs } from "../../core/elements/divs";
import { AppState } from "../models/AppState";
import { ELEMENT } from "../elements/ELEMENT";
import { GuessButton } from "./GuessButton";

export function GuessButtonArea(state: AppState) {
    ///
    const [buttonArea] = useXrefDivs(ELEMENT.buttonArea);
    const buttons: JSX.Element[] = [];
    for (let i = 0; i < state.settings.guessButtonCount; i++) {
        buttons.push(<GuessButton index={i} key={i} />);
    }

    return (
        <section
            id={buttonArea.id}
            ref={buttonArea.ref}
            className="buttons hidden">
            {buttons}
        </section>
    );
}
