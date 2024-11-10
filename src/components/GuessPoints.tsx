import { useAppContext } from "../app/App.context";
import { AnimeComponent } from "../code/Anime";
import { TV } from "../code/Theme";
import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { useStyle } from "./GuessPoints.style";

export function GuessPoints() {
    ////
    const { state } = useAppContext();
    const { itemScore } = state;
    const animation = useAnimeRef(AnimeComponent.GuessPoints);
    const style = useStyle({ timeBonus: false });

    ///
    const label = itemScore === 1 ? "point" : "points";
    const render = itemScore ? `+${itemScore} ${label}` : "no points";
    style.section.color = itemScore
        ? ThemeVars.getValue(TV.GuessPoints_CORRECT_color)
        : ThemeVars.getValue(TV.GuessPoints_WRONG_color);

    return (
        <section id={animation.id} style={style.section}>
            {render}
        </section>
    );
}
