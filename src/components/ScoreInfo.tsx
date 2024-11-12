import { useAppContext } from "../app/context";
import { AnimComponent } from "../code/Animation";
import { useAnimeRef } from "../libs/anime-context/AnimeHooks";
import { useStyle } from "./ScoreInfo.style";

export function ScoreInfo() {
    ////
    const animation = useAnimeRef(AnimComponent.ScoreInfo);
    const style = useStyle();
    const { state } = useAppContext();
    const { quizScore } = state;

    return (
        <section id={animation.id} style={style?.section}>
            <div></div>
            <span style={style?.span}>SCORE: </span>
            {quizScore}
        </section>
    );
}
