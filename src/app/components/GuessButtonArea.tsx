import { AppState } from "../models/AppState";
import { ELEMENT } from "../constants/elements";
import { GuessButton } from "./GuessButton";
import { useElementDivs } from "../../core/hooks/useElementDivs";

export function GuessButtonArea(state: AppState) {
    ///
    const [buttonArea] = useElementDivs(ELEMENT.buttonArea);
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
