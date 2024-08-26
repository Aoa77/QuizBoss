import AppProps from "../props/AppProps";

export default function QuestionImage(props: AppProps) {
    const { elements, currentItemIndex, quizModule } = props;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elements.imageSection} className="image hidden">
            {quizData?.items[currentItemIndex].imageJsx}
        </section>
    );
}


