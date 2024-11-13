import { useAppContext } from "../app/context";
import { ANIM } from "../code/animation";
import { SectionStyle, ThemeFont, TV } from "../code/style";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";

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


function useStyle(params: { timeBonus: boolean }): SectionStyle | null {
    // return null;  // INLINE STYLES;
    return {
        section: {
            alignContent: "normal",
            color: ThemeVars.getRef(TV, TV.GuessPoints_CORRECT_color),
            fontFamily: ThemeFont.mono,
            fontWeight: "bold",
            fontSize: CssUnit.rem(4),
            marginTop: CssUnit.cqh(params.timeBonus ? 57 : 51),
        },
    };
}
