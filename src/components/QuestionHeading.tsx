import { AppContext } from "../context";

export default function QuestionHeading(context: AppContext) {
    const { elementContext, stateContext } = context;
    const { state } = stateContext;
    const quizData = state.quizModule?.quizData;
    return (
        <h2 ref={elementContext.refs.questionHeading} className="hidden">
            {quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}
