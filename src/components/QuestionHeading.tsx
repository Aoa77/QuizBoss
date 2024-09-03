import { AppContext } from "../hooks";

export default function QuestionHeading(context: AppContext) {
    const { elementsHook, stateHook } = context;
    const { state } = stateHook;
    const quizData = state.quizModule?.quizData;
    return (
        <h2 ref={elementsHook.refs.questionHeading} className="hidden">
            {quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}
