import { AppContext } from "../app";

export default function ScoreDisplay(context: AppContext) {
    const { elements, states } = context;
    const { state } = states;
    const { score, best, quizModule } = state;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elements.refs.scoreArea} className="score hidden">
            <div>{quizData?.scoreText}</div>
            <div>{quizData?.bestText}</div>
            <div className="row">
                <div ref={elements.refs.score}>{score}</div>
                <div ref={elements.refs.best}>{best}</div>
            </div>
        </section>
    );
}
