import AppContext from "../app/AppContext";

export default function ScoreDisplay() {
    const elements = AppContext.elements();
    const { refs } = elements;
    const { scoreArea, scoreValue, bestValue } = refs;

    const appState = AppContext.appState();
    const { state } = appState;
    const { score, best, quizModule } = state;
    const quizData = quizModule?.quizData;

    return (
        <section
            id={scoreArea.target}
            ref={scoreArea.object}
            className="score hidden">
            <div>{quizData?.scoreText}</div>
            <div>{quizData?.bestText}</div>
            <div className="row">
                <div id={scoreValue.target} ref={scoreValue.object}>
                    {score}
                </div>
                <div id={bestValue.target} ref={bestValue.object}>
                    {best}
                </div>
            </div>
        </section>
    );
}
