import { CSSProperties } from "react";
import { ANIM } from "../code/AnimationManager";
import { SectionStyle, TV, ThemeFont } from "../code/style";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";

export function QuestionTimer() {
    const animation = useAnimeRef(ANIM.QuestionTimer);
    const style = useStyle();

    return (
        <section style={style?.section}>
            <div id={animation.id} style={style?.digits}></div>
        </section>
    );
}


interface Style extends SectionStyle {
    digits: CSSProperties;
}

function useStyle(): Style | null {
    // return null;  // INLINE STYLES;
    return {
        section: {
            opacity: 1,
            alignContent: "normal",
            color: ThemeVars.getRef(TV, TV.QuestionTimer_NORMAL_color),
            fontFamily: ThemeFont.mono,
            fontWeight: "bold",
            fontSize: CssUnit.rem(4),
            marginTop: CssUnit.cqh(39),
            backgroundColor: "#ff00ff00",
        },
        digits: {
            opacity: 0,
            backgroundColor: "#00ffff00",
            display: "inline-block",
        },
    };
}