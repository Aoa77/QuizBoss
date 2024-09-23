import { useXrefDivs } from "../../core/elements/divs";
import { AppState } from "../appFlow/AppState";
import { ELEMENT } from "../elements/constants";

export default function ScoreDisplay(state: AppState) {
    const [scoreArea, scoreValue, bestValue] = useXrefDivs(
        ELEMENT.scoreArea,
        ELEMENT.scoreValue,
        ELEMENT.bestValue,
    );

    const { score, best, quizModule } = state;
    const { scoreText, bestText } = quizModule?.quizData ?? {};

    return (
        <section id={scoreArea!.id} ref={scoreArea!.ref} className="score hidden">
            <div>{scoreText}</div>
            <div>{bestText}</div>
            <div className="row">
                <div id={scoreValue!.id} ref={scoreValue!.ref}>
                    {score}
                </div>
                <div id={bestValue!.id} ref={bestValue!.ref}>
                    {best}
                </div>
            </div>
        </section>
    );
}
