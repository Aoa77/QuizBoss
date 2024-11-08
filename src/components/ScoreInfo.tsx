import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { AnimeComponent } from "../code/Anime";
import { QuizState } from "../code/QuizState";
import { useStyle } from "./ScoreInfo.style";

export function ScoreInfo() {
    ////
    const animation = useAnimeRef(AnimeComponent.ScoreInfo);
    const style = useStyle();
    const [state] = FlowContext.current<QuizState>();
    const { quizScore } = state;

    return (
        <section id={animation.id} style={style.section}>
            <div></div><span style={style.span}>SCORE: </span>{quizScore}
        </section>
    );
}
