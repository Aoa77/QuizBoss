import { useElementHeadings } from "../../core/hooks/useElementHeadings";
import { ELEMENT } from "../constants/elements";
import { AppState } from "../models/AppState";

export function BonusNotification(state: AppState) {
    const [bonusValue] = useElementHeadings(ELEMENT.bonusValue);

    return (
        <h2
            id={bonusValue.id}
            ref={bonusValue.ref}
            className="hidden"
            data-value={state.award}>
            &nbsp;
        </h2>
    );
}
