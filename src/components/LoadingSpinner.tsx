import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { SvgThings } from "../libs/theme-vars/SvgThings";
import { AnimeComponent } from "../models/Anime";
import { useStyle } from "./LoadingSpinner.style";

export function LoadingSpinner() {
    const style = useStyle();
    const animation = useAnimeRef(AnimeComponent.LoadingSpinner);

    const balls = style.cxArray.map((cx, key) => (
        <circle key={key} cx={cx} cy={style.cy} r={style.radiusBase} />
    ));

    return (
        <section id={animation.id} ref={animation.ref} style={style.section}>
            <svg style={style.svg} viewBox={style.viewBox} xmlns={SvgThings.xmlns}>
                {balls}
            </svg>
        </section>
    );
}
