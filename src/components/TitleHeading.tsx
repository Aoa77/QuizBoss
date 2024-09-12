import { AppContext } from "../context";

export default function TitleHeading(context: AppContext) {
    const { elementContext, stateContext } = context;
    const { state } = stateContext;
    const quizData = state.quizModule?.quizData;
    return (
        <h1 ref={elementContext.refs.titleHeading} className="hidden">
            {quizData?.title ?? <>&nbsp;</>}
        </h1>
    );
}
