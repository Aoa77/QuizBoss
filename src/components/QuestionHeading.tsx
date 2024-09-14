import { AppContext } from "../app";

export default function QuestionHeading(context: AppContext) {
    const { elements, states } = context;
    const { state } = states;
    const quizData = state.quizModule?.quizData;
    return (
        <h2 ref={elements.refs.question} className="hidden">
            {quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}
