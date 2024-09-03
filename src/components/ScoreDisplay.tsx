import { AppProps } from "../props";

export default function ScoreDisplay(props: AppProps) {
    const { elements, state} = props;
    const { score, best, quizModule } = state;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elements.scoreSection} className="score hidden">
            <div>{quizData?.scoreText}</div>
            <div>{quizData?.bestText}</div>
            <div className="row">
                <div>{score}<span><mark ref={elements.scoreMark}></mark></span></div>
                <div>{best}</div>
            </div>
        </section>
    );
}
