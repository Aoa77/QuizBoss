import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { AnimeComponent } from "../models/Anime";
import { QuizState } from "../models/QuizState";
import { useStyle } from "./CorrectGuessPoints.style";

export function CorrectGuessPoints() {
    ////
    const animation = useAnimeRef(AnimeComponent.CorrectGuessPoints);
    const style = useStyle();
    const [state] = FlowContext.current<QuizState>();
    const { itemScore } = state;

    return (
        <section id={animation.id} style={style.section}>
            +{itemScore} points
        </section>
    );
}
