import { AppProps } from "../props";

export default function QuestionImage(props: AppProps) {
    const { elements, state } = props;
    const { currentItemIndex, quizModule } = state;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elements.imageSection} className="image hidden">
            {quizData?.items[currentItemIndex].imageJsx}
        </section>
    );
}
