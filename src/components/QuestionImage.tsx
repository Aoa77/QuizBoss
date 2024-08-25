import AllProps from "../props/AllProps";

export default function QuestionImage(props: AllProps) {
    const { elements, currentItemIndex, quizModule } = props;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elements.image} className="image hidden">
            {quizData?.items[currentItemIndex].imageJsx}
        </section>
    );
}


