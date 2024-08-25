import { Context } from "./Context";

export default function ScoreDisplay(context: Context) {
    const { elements, quizModule, score } = context;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elements.score} className="score hidden">
            <div>{quizData?.scoreText}</div>
            <div>{quizData?.bestText}</div>
            <div>{quizData?.leaderText}</div>
            <div className="row">
                <div>{score}</div>
                <div>{score}</div>
                <div>{score}</div>
            </div>
        </section>
    );
}
