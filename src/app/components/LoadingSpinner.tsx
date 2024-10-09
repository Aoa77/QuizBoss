import { createXref } from "../../core/animation/dom/createXref";
import { ELEMENT } from "../constants/ELEMENT";

export function LoadingSpinner() {
    const [loading] = createXref.divs(ELEMENT.loadingSpinner);
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
