import { AnimeComponent } from "../code/Anime";
import { useAnimeRef } from "../libs/anime-context/AnimeHooks";

export function LoadingSpinner() {
    const animation = useAnimeRef(AnimeComponent.LoadingSpinner);
    ///
    return (
        <section id={animation.id}>
            LOADING
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>
    );
}
