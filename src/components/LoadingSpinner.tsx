///
import { useEffect } from "react";
import anime from "animejs";

///
import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { $ease } from "../libs/anime-context/AnimeContext.constants";
import { SvgThings } from "../libs/theme-vars/SvgThings";
import { AnimeComponent } from "../code/Anime";
import { useStyle } from "./LoadingSpinner.style";

export function LoadingSpinner() {
    const style = useStyle();
    const animation = useAnimeRef(AnimeComponent.LoadingSpinner);

    const balls = style.cxArray.map((cx, key) => (
        <circle /////////////////////
            key={key}
            cx={cx}
            cy={style.cy}
            r={style.radiusBase}
            will-change="r"
        />
    ));

    useEffect(() => {
        anime({
            targets: "svg > circle",
            r: [3, 12, 3],
            loop: true,
            delay: anime.stagger(100),
            duration: 700,
            easing: $ease.linear,
        });
    }, []);

    return (
        <section id={animation.id} style={style.section}>
            <svg style={style.svg} viewBox={style.viewBox} xmlns={SvgThings.xmlns}>
                {balls}
            </svg>
        </section>
    );
}
