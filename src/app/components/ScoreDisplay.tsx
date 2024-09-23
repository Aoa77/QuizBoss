import { useXrefDivs } from "../../core/xrefs/divs";
import { AppState } from "../appFlow/AppState";
import { ElementNames } from "../elements/constants";

export default function ScoreDisplay(state: AppState) {
    const [scoreArea, scoreValue, bestValue] = useXrefDivs(
        ElementNames.scoreArea,
        ElementNames.scoreValue,
        ElementNames.bestValue,
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
