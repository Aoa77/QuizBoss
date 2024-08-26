import AppProps from "../props/AppProps";

export default function ScoreDisplay(props: AppProps) {
    const { elements, quizModule, score } = props;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elements.scoreSection} className="score hidden">
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
