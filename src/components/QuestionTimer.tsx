import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { AnimeComponent } from "../models/Anime";
import { useStyle } from "./QuestionTimer.style";

export function QuestionTimer() {
    const animation = useAnimeRef(AnimeComponent.QuestionTimer);
    const style = useStyle();

    return <section id={animation.id} style={style.section}></section>;
}

