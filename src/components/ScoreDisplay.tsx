import { AppContext } from "../context";

export default function ScoreDisplay(context: AppContext) {
    const { elementContext, stateContext } = context;
    const { state } = stateContext;
    const { score, best, quizModule } = state;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elementContext.refs.scoreSection} className="score hidden">
            <div>{quizData?.scoreText}</div>
            <div>{quizData?.bestText}</div>
            <div className="row">
                <div>
                    {score}
                    <span>
                        <mark ref={elementContext.refs.scoreMark}></mark>
                    </span>
                </div>
                <div>{best}</div>
            </div>
        </section>
    );
}
