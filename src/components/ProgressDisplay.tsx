import { AppContext } from "../hooks";

export default function ProgressDisplay(context: AppContext) {
    const { elementsHook, stateHook } = context;
    const { currentItemIndex, quizModule } = stateHook.state;
    const quizData = quizModule?.quizData;
    return (
        <section
            ref={elementsHook.refs.progressSection}
            className="progress hidden"
        >
            <span className="current">{currentItemIndex + 1}</span>
            <span> / </span>
            <span className="total">{quizData?.items.length}</span>
        </section>
    );
}
