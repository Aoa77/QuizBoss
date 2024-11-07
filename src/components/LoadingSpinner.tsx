import { useEffect } from "react";
import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { SvgThings } from "../libs/theme-vars/SvgThings";
import { AnimeComponent } from "../models/Anime";
import { useStyle } from "./LoadingSpinner.style";
import anime from "animejs";
import { $ease } from "../libs/anime-context/AnimeContext.constants";

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
