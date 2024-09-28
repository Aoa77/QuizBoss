import { useElementHeadings } from "../../core/hooks/useElementHeadings";
import { ELEMENT } from "../constants/elements";

export function BonusNotification() {
    const [bonusValue] = useElementHeadings(ELEMENT.bonusValue);

    return (
        <h2
            id={bonusValue.id}
            ref={bonusValue.ref}
            className="hidden">
            &nbsp;
        </h2>
    );
}
