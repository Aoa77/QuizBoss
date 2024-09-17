import AppContext from "../app/AppContext";

export default function ProgressDisplay() {
    const elements = AppContext.elements();
    const { refs } = elements;
    const { progress } = refs;

    const appState = AppContext.appState();
    const { state } = appState;
    const { currentItemIndex, quizModule } = state;
    const quizData = quizModule?.quizData;
    
    return (
        <section
            id={progress.target}
            ref={progress.object}
            className="progress hidden"
        >
            <span className="current">{currentItemIndex + 1}</span>
            <span>/</span>
            <span className="total">{quizData?.items.length}</span>
        </section>
    );
}
