import { ELEMENT } from "../constants/elements";
import { GuessButton } from "./GuessButton";
import { useElementDivs } from "../../core/hooks/useElementDivs";
import { useMemo } from "react";
import { getAppState } from "../functions/getAppState";

export function GuessButtonArea() {
    ///
    const [state] = getAppState();
    const [buttonArea] = useElementDivs(ELEMENT.buttonArea);

    const buttonCount = useMemo(() => {
        return state.settings.guessButtonCount;
    }, [state.settings.guessButtonCount]);

    const buttons = useMemo(() => {
        const btns: JSX.Element[] = [];
        for (let i = 0; i < buttonCount; i++) {
            btns.push(<GuessButton index={i} key={i} />);
        }
        return btns;
    }, [buttonCount]);

    const area = useMemo(
        () => (
            <section
                id={buttonArea.id}
                ref={buttonArea.ref}
                className="buttons hidden">
                {buttons}
            </section>
        ),
        [buttonArea, buttons],
    );
    return area;
}
