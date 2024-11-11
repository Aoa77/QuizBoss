import { AnimeComponent } from "../code/Anime";
import { useAnimeRef } from "../libs/anime-context/AnimeContext";
import { useStyle } from "./LoadingProgress.style";

export function LoadingProgress() {
    const style = useStyle();
    const animation = useAnimeRef(AnimeComponent.LoadingProgress);
    ///
    return (
        <section id={animation.id} style={style?.section}>
            LOADING
            <div style={style?.progBarBackground}>
                <div style={style?.progBarForeground}></div>
            </div>
        </section>
    );
}
