import { CSSProperties } from "react";
import { useAppContext } from "../../core/context";
import { AnimKey } from "../../animations";
import { SectionStyle, ThemeFont, TV } from "../../core/themes";
import { useAnimeRef } from "../../libs/anime-context/hooks";
import { CssUnit } from "../../libs/theme-vars/CssUnit";
import { ThemeVars } from "../../libs/theme-vars/ThemeVars";

export function ScoreInfo() {
    ////
    const animation = useAnimeRef(AnimKey.ScoreInfo);
    const style = useStyle();
    const { state } = useAppContext();
    const { quizScore } = state;

    return (
        <section id={animation.id} style={style?.section}>
            <div></div>
            <span style={style?.span}>SCORE: </span>
            {quizScore}
        </section>
    );
}

interface Style extends SectionStyle {
    span: CSSProperties;
}

function useStyle(): Style | null {
    // return null;  // INLINE STYLES;
    return {
        section: {
            alignContent: "normal",
            color: ThemeVars.getRef(TV, TV.ScoreInfo_VALUE_color),
            fontFamily: ThemeFont.mono,
            fontWeight: "bold",
            fontSize: CssUnit.rem(3),
            marginTop: CssUnit.cqh(89),
        },
        span: {
            color: ThemeVars.getRef(TV, TV.ScoreInfo_TEXT_color),
            fontWeight: "normal",
        },
    };
}
