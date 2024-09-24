import { useXrefDivs } from "../../core/elements/divs";
import { ELEMENT } from "../elements/constants";

export function LoadingSpinner() {
    const [loading] = useXrefDivs(ELEMENT.loading);
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
