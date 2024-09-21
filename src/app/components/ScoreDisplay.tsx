import { useXref } from "../../core/hooks/useXref";
import { AppState } from "../appFlow/AppState";
import { ElementNames } from "../elements/ElementNames";

export default function ScoreDisplay(state: AppState) {
    const [scoreArea, scoreValue, bestValue] = useXref<HTMLDivElement>(
        { id: ElementNames.scoreArea },
        { id: ElementNames.scoreValue },
        { id: ElementNames.bestValue },
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
