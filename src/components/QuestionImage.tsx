import { AppContext } from "../app";

export default function QuestionImage(context: AppContext) {
    const { elements: elementController, states: stateController } = context;
    const { state } = stateController;
    const { currentItemIndex, quizModule } = state;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elementController.refs.imageSection} className="image hidden">
            {quizData?.items[currentItemIndex].imageJsx}
        </section>
    );
}
