import { AppContext } from "../app";

export default function TitleHeading(context: AppContext) {
    const { elements, states } = context;
    const { state } = states;
    const quizData = state.quizModule?.quizData;
    return (
        <h1 ref={elements.refs.titleHeading} className="hidden">
            {quizData?.title ?? <>&nbsp;</>}
        </h1>
    );
}
