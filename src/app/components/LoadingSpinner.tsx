import { useElementDivs } from "../../core/hooks/useElementDivs";
import { ELEMENT } from "../constants/elements";

export function LoadingSpinner() {
    const [loading] = useElementDivs(ELEMENT.loading);
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
