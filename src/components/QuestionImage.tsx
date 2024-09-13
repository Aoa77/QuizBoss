import { AppContext } from "../app";

export default function QuestionImage(context: AppContext) {
    const { elements, states } = context;
    const { state } = states;
    const { currentItemIndex, quizModule } = state;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elements.refs.imageSection} className="image hidden">
            {quizData?.items[currentItemIndex].imageJsx}
        </section>
    );
}
