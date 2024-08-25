import AllProps from "../props/AllProps";

export default function HeadingText(props: AllProps) {
    const { elements, quizModule } = props;
    const quizData = quizModule?.quizData;
    return (
        <>
            <h1 ref={elements.title} className="hidden">
                {quizData?.title}
            </h1>
            <h2 ref={elements.question} className="hidden">
                {quizData?.questionText}
            </h2>
        </>
    );
}
