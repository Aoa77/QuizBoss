import { AppContext } from "../hooks";

export default function QuestionImage(context: AppContext) {
    const { elementContext, stateContext } = context;
    const { state } = stateContext;
    const { currentItemIndex, quizModule } = state;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elementContext.refs.imageSection} className="image hidden">
            {quizData?.items[currentItemIndex].imageJsx}
        </section>
    );
}
