import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { AnimeComponent } from "../models/Anime";
import { QuizState } from "../models/QuizState";
import { TV } from "../models/Theme";
import { useStyle } from "./GuessPoints.style";

export function GuessPoints() {
    ////
    const animation = useAnimeRef(AnimeComponent.GuessPoints);
    const style = useStyle();
    const [state] = FlowContext.current<QuizState>();
    const { itemScore } = state;
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
