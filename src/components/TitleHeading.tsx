import AppContext from "../app/AppContext";

export default function TitleHeading(context: AppContext) {
    const { elements, states } = context;
    const { refs } = elements;
    const { title } = refs;
    const { state } = states;
    const quizData = state.quizModule?.quizData;
    return (
        <h1 id={title.target} ref={title.object} className="hidden">
            {quizData?.title ?? <>&nbsp;</>}
        </h1>
    );
}
