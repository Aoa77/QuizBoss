import { ELEMENT } from "../animation/elements";
import { GuessButton } from "./GuessButton";
import { useElementDivs } from "../../core/xelemental/useElementDivs";
import { getStateFlow } from "../../core/state-flow/getStateFlow";
import { AppState } from "../models/AppState";

export function GuessButtonArea() {
    ///
    const [state] = getStateFlow<AppState>();
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
