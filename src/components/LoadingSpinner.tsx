import AppContext from "../app/AppContext";

export default function LoadingSpinner(context: AppContext) {
    const { elements } = context;
    const { refs } = elements;
    const { loading } = refs;
    return (
        <section
            id={loading.target}
            ref={loading.object}
            className="loading hidden"
        >
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>
    );
}
