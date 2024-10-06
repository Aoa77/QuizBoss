import { AppState } from "../models/AppState";
import { ELEMENT } from "../animation/elements";
import { createElementDivs } from "../../core/xelemental/createElementDivs";

export function ScoreDisplay(state: AppState) {
    const [
        bestValue,
        scoreArea,
        scoreValue,
        scoreValue_plus1,
        scoreValue_plus2,
        scoreValue_plus3,
        ///
    ] = createElementDivs(
        ELEMENT.bestValue,
        ELEMENT.scoreArea,
        ELEMENT.scoreValue,
        ELEMENT.scoreValue_plus1,
        ELEMENT.scoreValue_plus2,
        ELEMENT.scoreValue_plus3,
    );

    const { score, best, quizModule } = state;
    const { scoreText, bestText } = quizModule?.quizData ?? {};

    return (
        <>
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


        <div id={scoreValue_plus1.id} ref={scoreValue_plus1.ref}>
            {score}
        </div>
        <div id={scoreValue_plus2.id} ref={scoreValue_plus2.ref}>
            {score}
        </div>
        <div id={scoreValue_plus3.id} ref={scoreValue_plus3.ref}>
            {score}
        </div>
        </>
    );
}
