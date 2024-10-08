import { createXref } from "../../core/animation/dom/createXref";
import { ELEMENT } from "../animation/elements";

export function BonusNotification() {
    const [bonusValue] = createXref.headings(ELEMENT.bonusValue);
    return (
        <h2
            id={bonusValue.id}
            ref={bonusValue.ref}
            className="hidden">
            &nbsp;
        </h2>
    );
}
