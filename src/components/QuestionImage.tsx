import { Context } from "./Context";

export default function QuestionImage(context: Context) {
    const { elements, currentItemIndex, quizModule } = context;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elements.image} className="image hidden">
            {quizData?.items[currentItemIndex].imageJsx}
        </section>
    );
}


