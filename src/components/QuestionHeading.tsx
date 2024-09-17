import AppContext from "../app/AppContext";

export default function QuestionHeading() {
    const elements = AppContext.elements();
    const { refs } = elements;
    const { question } = refs;
    
    const appState = AppContext.appState();
    const { state } = appState;
    const quizData = state.quizModule?.quizData;
    
    return (
        <h2 id={question.target} ref={question.object} className="hidden">
            {quizData?.questionText ?? <>&nbsp;</>}
        </h2>
    );
}
