import { AppContext } from "../context";

export default function ProgressDisplay(context: AppContext) {
    const { elementContext, stateContext } = context;
    const { currentItemIndex, quizModule } = stateContext.state;
    const quizData = quizModule?.quizData;
    return (
        <section
            ref={elementContext.refs.progressSection}
            className="progress hidden"
        >
            <span className="current">{currentItemIndex + 1}</span>
            <span> / </span>
            <span className="total">{quizData?.items.length}</span>
        </section>
    );
}
