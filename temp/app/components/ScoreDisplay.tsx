import { QuizState } from "../models/QuizState";
import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";

export function ScoreDisplay(state: QuizState) {
    const [scoreArea] = createXref.divs(ELEMENT.scoreArea);
    const { score, best, quizModule } = state;
    const { scoreText, bestText } = quizModule?.quizData ?? {};

    return (
        <section id={scoreArea.id} ref={scoreArea.ref} className="score hidden">
            <label>{scoreText}</label>
            <div></div>
            <label>{bestText}</label>
            <div>{score}</div>
            <div></div>
            <div>{best}</div>
        </section>
    );
}
