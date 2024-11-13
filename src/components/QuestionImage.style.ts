import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV } from "../code/style";

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
        marginTop: CssUnit.cqh(14),
    };

    ///
    style.image = {
        cursor: "pointer",
        height: CssUnit.cqh(20),
        boxShadow: `0 0 ${CssUnit.cqw(16)} ${CssUnit.cqw(3)} ${ThemeVars.getRef(
            TV,
            TV.QuestionImage_shadow,
        )}`,
        display: "none",
    };

    ///
    return style;
}
