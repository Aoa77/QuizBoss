import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV } from "../code/Theme";

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
        height: CssUnit.cqh(20),
        marginTop: CssUnit.cqh(14),
    };

    ///
    style.image = {
        cursor: "pointer",
        height: style.section.height,
        boxShadow: `0 0 ${CssUnit.cqw(16)} ${CssUnit.cqw(3)} ${ThemeVars.getRef(
            TV,
            TV.QuestionImage_shadow,
        )}`,
    };

    ///
    return style;
}
