import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { ThemeFont, TV } from "../code/Theme";

interface Style {
    section: CSSProperties;
}

export function useStyle(): Style | null {
    // return null;  // INLINE STYLES;
    const style: Style = {
        ///
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
    return style;
}
