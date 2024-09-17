import AppContext from "../app/AppContext";

export default function TitleHeading() {
    const elements = AppContext.elements();
    const { refs } = elements;
    const { title } = refs;

    const appState = AppContext.appState();
    const { state } = appState;
    const quizData = state.quizModule?.quizData;
    
    return (
        <h1 id={title.target} ref={title.object} className="hidden">
            {quizData?.title ?? <>&nbsp;</>}
        </h1>
    );
}
