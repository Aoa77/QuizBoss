import AllProps from "../props/AllProps";

export default function LoadingSpinner(props: AllProps) {
    const { elements } = props;
    return (
        <section ref={elements.loading} className="loading hidden">
            <div className="spinner"></div>
        </section>
    );
}
