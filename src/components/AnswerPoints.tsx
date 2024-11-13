import { ANIM } from "../code/Animation";
import { TV } from "../code/Theme";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { useAppContext } from "../app/context";
import { useStyle } from "./AnswerPoints.style";

export function AnswerPoints() {
    ////
    const { state } = useAppContext();
    const { itemScore } = state;
    const animation = useAnimeRef(ANIM.AnswerPoints);
    
    const style = useStyle({ timeBonus: false });

    const label = itemScore === 1 ? "point" : "points";
    const render = itemScore ? `+${itemScore} ${label}` : "no points";
    ///
    if (style) {
        style.section.color = itemScore
            ? ThemeVars.getValue(TV.GuessPoints_CORRECT_color)
            : ThemeVars.getValue(TV.GuessPoints_WRONG_color);
    }

    return (
        <section id={animation.id} style={style?.section}>
            {render}
        </section>
    );
}
