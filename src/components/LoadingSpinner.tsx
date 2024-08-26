import AppProps from "../props/AppProps";

export default function LoadingSpinner(props: AppProps) {
    const { elements } = props;
    return (
        <section ref={elements.loadingSection} className="loading hidden">
            <div className="spinner"></div>
        </section>
    );
}
