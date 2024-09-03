import { AppContext } from "../models";

export default function TitleHeading(context: AppContext) {
    const { elementsHook, stateHook } = context;
    const { state } = stateHook;
    const quizData = state.quizModule?.quizData;
    return (
        <h1 ref={elementsHook.refs.titleHeading} className="hidden">
            {quizData?.title ?? <>&nbsp;</>}
        </h1>
    );
}
