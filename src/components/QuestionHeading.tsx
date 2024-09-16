import AppContext from "../app/AppContext";

export default function QuestionHeading(context: AppContext) {
    const { elements, states } = context;
    const { refs } = elements;
    const { question } = refs;
    const { state } = states;
    const quizData = state.quizModule?.quizData;
    return (
        <h2 id={question.target} ref={question.object} className="hidden">
            {quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}
