import { createElementDivs } from "../../core/xelemental/createElementDivs";
import { ELEMENT } from "../animation/elements";

export function LoadingSpinner() {
    const [loading] = createElementDivs(ELEMENT.loading);
    return (
        <section id={loading.id} ref={loading.ref} className="loading hidden">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>
    );
}
