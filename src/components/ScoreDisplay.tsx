import { AppContext } from "../hooks";

export default function ScoreDisplay(context: AppContext) {
    const { elementsHook, stateHook } = context;
    const { state } = stateHook;
    const { score, best, quizModule } = state;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elementsHook.refs.scoreSection} className="score hidden">
            <div>{quizData?.scoreText}</div>
            <div>{quizData?.bestText}</div>
            <div className="row">
                <div>
                    {score}
                    <span>
                        <mark ref={elementsHook.refs.scoreMark}></mark>
                    </span>
                </div>
                <div>{best}</div>
            </div>
        </section>
    );
}
