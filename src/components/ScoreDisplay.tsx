import AllProps from "../props/AllProps";

export default function ScoreDisplay(props: AllProps) {
    const { elements, quizModule, score } = props;
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
