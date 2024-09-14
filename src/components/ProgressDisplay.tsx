import { AppContext } from "../app";

export default function ProgressDisplay(context: AppContext) {
    const { elements, states } = context;
    const { currentItemIndex, quizModule } = states.state;
    const quizData = quizModule?.quizData;
    return (
        <section
            ref={elements.refs.progress}
            className="progress hidden"
        >
            <span className="current">{currentItemIndex + 1}</span>
            <span>/</span>
            <span className="total">{quizData?.items.length}</span>
        </section>
    );
}
