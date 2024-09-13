import { ContextController } from "../controllers";

export default function ProgressDisplay(context: ContextController) {
    const { elements: elementController, stateController } = context;
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
