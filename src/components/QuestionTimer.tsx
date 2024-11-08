import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { AnimeComponent } from "../code/Anime";
import { useStyle } from "./QuestionTimer.style";

export function QuestionTimer() {
    const animation = useAnimeRef(AnimeComponent.QuestionTimer);
    const style = useStyle();

    return (
        <section style={style.section}>
            <div id={animation.id} style={style.digits}></div>
        </section>
    );
}
