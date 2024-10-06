import { createElementHeadings } from "../../core/xelemental/createElementHeadings";
import { ELEMENT } from "../animation/elements";

export function BonusNotification() {
    const [bonusValue] = createElementHeadings(ELEMENT.bonusValue);

    return (
        <h2
            id={bonusValue.id}
            ref={bonusValue.ref}
            className="hidden">
            &nbsp;
        </h2>
    );
}
