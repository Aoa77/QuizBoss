import { Context } from "./Context";

export default function LoadingSpinner(context: Context) {
    const { elements } = context;
    return (
        <section ref={elements.loading} className="loading hidden">
            <div className="spinner"></div>
        </section>
    );
}
