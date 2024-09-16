import AppContext from "../app/AppContext";

export default function ProgressDisplay(context: AppContext) {
    const { elements, states } = context;
    const { refs } = elements;
    const { progress } = refs;
    const { currentItemIndex, quizModule } = states.state;
    const quizData = quizModule?.quizData;
    return (
        <section
            id={progress.target}
            ref={progress.object}
            className="progress hidden"
        >
            <span className="current">{currentItemIndex + 1}</span>
            <span>/</span>
            <span className="total">{quizData?.items.length}</span>
        </section>
    );
}
