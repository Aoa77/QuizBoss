import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { AnimeComponent } from "../models/Anime";
import { useStyle } from "./RevealGuessNoPoints.style";

export function RevealGuessNoPoints() {
    ////
    const animation = useAnimeRef(AnimeComponent.RevealGuessNoPoints);
    const style = useStyle();

    return (
        <section id={animation.id} style={style.section}>
            no points
        </section>
    );
}
