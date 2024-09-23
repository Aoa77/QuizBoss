import { useXrefDivs } from "../../core/xrefs/divs";
import { ElementNames } from "../elements/constants";

export default function LoadingSpinner() {
    const [loading] = useXrefDivs(ElementNames.loading);
    return (
        <section id={loading!.id} ref={loading!.ref} className="loading hidden">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>
    );
}
