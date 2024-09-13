import { ContextController } from "../controllers";

export default function LoadingSpinner(context: ContextController) {
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
