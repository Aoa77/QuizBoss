import { AppContext } from "../context";

export default function LoadingSpinner(context: AppContext) {
    const { elementContext } = context;
    return (
        <section
            ref={elementContext.refs.loadingSection}
            className="loading hidden"
        >
            <div className="spinner"></div>
        </section>
    );
}
