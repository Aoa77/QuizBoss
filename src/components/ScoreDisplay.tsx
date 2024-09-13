import { AppContext } from "../app";

export default function ScoreDisplay(context: AppContext) {
    const { elements, states: stateController } = context;
    const { state } = stateController;
    const { score, best, quizModule } = state;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elements.refs.scoreSection} className="score hidden">
            <div>{quizData?.scoreText}</div>
            <div>{quizData?.bestText}</div>
            <div className="row">
                <div>
                    {score}
                    <span>
                        <mark ref={elements.refs.scoreMark}></mark>
                    </span>
                </div>
                <div>{best}</div>
            </div>
        </section>
    );
}
