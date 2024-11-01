import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { AnimeComponent } from "../models/Anime";
import { TV } from "../models/Theme";
import { Timer } from "../models/Timer";
import { useStyle } from "./GuessPoints.style";

export function TimeBonus() {
    ////
    const animation = useAnimeRef(AnimeComponent.TimeBonus);
    const style = useStyle({ timeBonus: true });
    const bonus = Timer.secondsRemaining;
    const render = bonus ? `+${bonus} time bonus` : "no time bonus";
    style.section.color = bonus
        ? ThemeVars.getValue(TV.GuessPoints_CORRECT_color)
        : ThemeVars.getValue(TV.GuessPoints_WRONG_color);

    return (
        <section id={animation.id} style={style.section}>
            {render}
        </section>
    );
}
