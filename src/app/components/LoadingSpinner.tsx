import { useXref } from "../../core/hooks/useXref";
import { ElementNames } from "../elements/ElementNames";

export default function LoadingSpinner() {
    const [loading] = useXref<HTMLDivElement>({
        id: ElementNames.loading,
    });
    return (
        <section
            id={loading.id}
            ref={loading.ref}
            className="loading hidden">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>
    );
}
