import { ContextController } from "../controllers";

export default function QuestionHeading(context: ContextController) {
    const { elements, stateController } = context;
    const { state } = stateController;
    const quizData = state.quizModule?.quizData;
    return (
        <h2 ref={elements.refs.questionHeading} className="hidden">
            {quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}
