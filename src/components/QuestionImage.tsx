import AppContext from "../app/AppContext";

export default function QuestionImage(context: AppContext) {
    const { elements, states } = context;
    const { refs } = elements;
    const { image } = refs;
    const { state } = states;
    const { currentItemIndex, quizModule } = state;
    const quizData = quizModule?.quizData;
    return (
        <section id={image.target} ref={image.object} className="image hidden">
            {quizData?.items[currentItemIndex].imageJsx}
        </section>
    );
}
