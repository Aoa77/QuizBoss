import AppProps from "../props/AppProps";

export default function QuestionHeading(props: AppProps) {
    const { elements, quizModule } = props;
    const quizData = quizModule?.quizData;
    return (
        <h2 ref={elements.questionHeading} className="hidden">
            {quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}
