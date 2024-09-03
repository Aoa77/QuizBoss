import { AppProps } from "../props";

export default function QuestionHeading(props: AppProps) {
    const { elements, state } = props;
    const quizData = state.quizModule?.quizData;
    return (
        <h2 ref={elements.questionHeading} className="hidden">
            {quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}
