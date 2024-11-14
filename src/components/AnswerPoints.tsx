import { useMemo } from "react";
import { useAppContext } from "../app/context";
import { ANIM } from "../code/AnimationManager";
import { SectionStyle, ThemeFont, TV } from "../app/themes";
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
    const valueStyle = computeValueStyle(itemScore);

    return (
        <section id={animation.id} style={style?.section}>
            <div style={valueStyle}>{render}</div>
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
    const valueStyle = computeValueStyle(bonus);

    return (
        <section id={animation.id} style={style?.section}>
            <div style={valueStyle}>{render}</div>
        </section>
    );
}

function useStyle(params: { timeBonus: boolean }): SectionStyle | null {
    const { timeBonus } = params;
    return useMemo(() => {
        console.debug("AnswerPoints.useStyle", { timeBonus });
        return {
            section: {
                alignContent: "normal",
                color: ThemeVars.getRef(TV, TV.GuessPoints_CORRECT_color),
                fontFamily: ThemeFont.mono,
                fontWeight: "bold",
                fontSize: CssUnit.rem(4),
                marginTop: CssUnit.cqh(timeBonus ? 57 : 51),
            },
        };
    }, [timeBonus]);
}

function computeValueStyle(score: number) {
    return {
        color: score
            ? ThemeVars.getValue(TV.GuessPoints_CORRECT_color)
            : ThemeVars.getValue(TV.GuessPoints_WRONG_color),
    };
}
