import { ANIM } from "../code/Animation";
import { TV } from "../code/Theme";
import { useAppContext } from "../app/context";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { useStyle } from "./AnswerPoints.style";

export function AnswerPointsTimeBonus() {
    ////
    const animation = useAnimeRef(ANIM.AnswerPointsTimeBonus);
    const { timer } = useAppContext();
    const { secondsRemaining: bonus } = timer;
    const render = bonus ? `+${bonus} time bonus` : "no time bonus";

    const style = useStyle({ timeBonus: true });
    if (style) {
        style.section.color = bonus
            ? ThemeVars.getValue(TV.GuessPoints_CORRECT_color)
            : ThemeVars.getValue(TV.GuessPoints_WRONG_color);
    }

    return (
        <section id={animation.id} style={style?.section}>
            {render}
        </section>
    );
}
