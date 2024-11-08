import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { AnimeComponent } from "../code/Anime";
import { TV } from "../code/Theme";
import { useStyle } from "./GuessPoints.style";
import { Timer } from "../code/Timer";

export function TimeBonus() {
    ////
    const animation = useAnimeRef(AnimeComponent.TimeBonus);
    const style = useStyle({ timeBonus: true });
    const bonus = Timer.instance().secondsRemaining;
    console.log("TimeBonus: bonus", bonus);
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
