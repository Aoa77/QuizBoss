import { AppState } from "../models/AppState";
import { ELEMENT } from "../constants/elements";
import { useElementDivs } from "../../core/hooks/useElementDivs";

export function ScoreDisplay(state: AppState) {
    const [scoreArea, scoreValue, bestValue] = useElementDivs(
        ELEMENT.scoreArea,
        ELEMENT.scoreValue,
        ELEMENT.bestValue,
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
