import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { AnimeComponent } from "../models/Anime";
import { useStyle } from "./LoadingProgress.style";

export function LoadingProgress() {
    const style = useStyle();
    const animation = useAnimeRef(AnimeComponent.LoadingProgress);
    ///
    return (
        <section id={animation.id} ref={animation.ref} style={style.section}>
            LOADING
            <div style={style.progBarBackground}>
                <div style={style.progBarForeground}></div>
            </div>
        </section>
    );
}
