import { QuizState } from "../models/QuizState";
import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";
import { ProgressDisplay } from "./ProgressDisplay";

export function ScoreDisplay(state: QuizState) {
    const [scoreArea] = createXref.divs(ELEMENT.scoreArea);

    const { score, best, quizModule } = state;
    const { scoreText, bestText } = quizModule?.quizData ?? {};

    return (
        <section id={scoreArea.id} ref={scoreArea.ref} className="score hidden">
            <div>{scoreText}:</div>
            <div>{score}</div>
            <div>{bestText}:</div>
            <div>{best}</div>
            <ProgressDisplay {...state} />
        </section>
    );
}
