import { AppContext } from "../app";

export default function LoadingSpinner(context: AppContext) {
    const { elements: elementController } = context;
    return (
        <section
            ref={elementController.refs.loadingSection}
            className="loading hidden"
        >
            <div className="spinner"></div>
        </section>
    );
}
