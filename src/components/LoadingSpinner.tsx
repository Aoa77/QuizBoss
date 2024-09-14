import { AppContext } from "../app";

export default function LoadingSpinner(context: AppContext) {
    const { elements } = context;
    return (
        <section ref={elements.refs.loading} className="loading hidden">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>
    );
}
