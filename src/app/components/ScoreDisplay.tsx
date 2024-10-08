import { QuizState } from "../models/QuizState";
import { ELEMENT } from "../animation/elements";
import { createXref } from "../../core/animation/dom/createXref";

export function ScoreDisplay(state: QuizState) {
    const [bestValue, scoreArea, scoreValue] = createXref.divs(
        ELEMENT.bestValue,
        ELEMENT.scoreArea,
        ELEMENT.scoreValue,
    );

    const { score, best, quizModule } = state;
    const { scoreText, bestText } = quizModule?.quizData ?? {};

    return (
        <section id={scoreArea.id} ref={scoreArea.ref} className="score hidden">
            <div>{scoreText}</div>
            <div>{bestText}</div>
            <div className="row">
                <div id={scoreValue.id} ref={scoreValue.ref}>
                    {score}
                </div>
                <div id={bestValue.id} ref={bestValue.ref}>
                    {best}
                </div>
            </div>
        </section>
    );
}
