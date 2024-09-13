import { ContextController } from "../controllers";

export default function QuestionImage(context: ContextController) {
    const { elements: elementController, stateController } = context;
    const { state } = stateController;
    const { currentItemIndex, quizModule } = state;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elementController.refs.imageSection} className="image hidden">
            {quizData?.items[currentItemIndex].imageJsx}
        </section>
    );
}
