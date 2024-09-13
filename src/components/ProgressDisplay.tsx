import { AppContext } from "../app";

export default function ProgressDisplay(context: AppContext) {
    const { elements: elementController, states: stateController } = context;
    const { currentItemIndex, quizModule } = stateController.state;
    const quizData = quizModule?.quizData;
    return (
        <section
            ref={elementController.refs.progressSection}
            className="progress hidden"
        >
            <span className="current">{currentItemIndex + 1}</span>
            <span>/</span>
            <span className="total">{quizData?.items.length}</span>
        </section>
    );
}
