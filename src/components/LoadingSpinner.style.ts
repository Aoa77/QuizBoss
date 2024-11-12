import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { ThemeFont, TV } from "../code/Theme";
import "./LoadingSpinner.style.css";

interface Style {
    image: CSSProperties;
    section: CSSProperties;
}

export function useStyle(): Style | null {
    // return null;  // INLINE STYLES;
    const style: Style = {
        ///
        image: {},
        section: {},
    };

    ///
    style.section = {
        color: ThemeVars.getRef(TV, TV.LoadingSpinner_color),
        height: CssUnit.cqh(2),
        marginTop: CssUnit.cqh(15),
        fontFamily: ThemeFont.mono,
        fontSize: CssUnit.rem(3),
        fontWeight: "bold",
    };

    ///
    style.image = {
        cursor: "pointer",
        height: style.section.height,
        boxShadow: `0 0 ${CssUnit.cqw(16)} ${CssUnit.cqw(3)} ${ThemeVars.getRef(
            TV,
            TV.QuestionImage_shadow,
        )}`,
        display: "none",
    };

    ///
    return style;
}
