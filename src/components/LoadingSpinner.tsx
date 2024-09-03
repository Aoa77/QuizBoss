import { AppContext } from "../models";

export default function LoadingSpinner(context: AppContext) {
    const { elementsHook } = context;
    return (
        <section
            ref={elementsHook.refs.loadingSection}
            className="loading hidden"
        >
            <div className="spinner"></div>
        </section>
    );
}
