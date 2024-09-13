import { AppContext } from "../app";

export default function LoadingSpinner(context: AppContext) {
    const { elements } = context;
    return (
        <section
            ref={elements.refs.loadingSection}
            className="loading hidden"
        >
            <div className="spinner"></div>
        </section>
    );
}
