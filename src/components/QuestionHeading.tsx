import { AppContext } from "../app";

export default function QuestionHeading(context: AppContext) {
    const { elements, states: stateController } = context;
    const { state } = stateController;
    const quizData = state.quizModule?.quizData;
    return (
        <h2 ref={elements.refs.questionHeading} className="hidden">
            {quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}
