import { useAppContext } from "../app/App.context";
import { AnimeComponent } from "../code/Anime";
import { useAnimeRef } from "../libs/anime-context/AnimeContext";
import { useStyle } from "./ScoreInfo.style";

export function ScoreInfo() {
    ////
    const animation = useAnimeRef(AnimeComponent.ScoreInfo);
    const style = useStyle();
    const { state } = useAppContext();
    const { quizScore } = state;

    return (
        <section id={animation.id} style={style.section}>
            <div></div>
            <span style={style.span}>SCORE: </span>
            {quizScore}
        </section>
    );
}
