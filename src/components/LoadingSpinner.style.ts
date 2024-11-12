import { CSSProperties } from "react";
// import { CssUnit } from "../libs/theme-vars/CssUnit";
// import { ThemeVars } from "../libs/theme-vars/ThemeVars";
// import { ThemeFont, TV } from "../code/Theme";

interface Style {
    section: CSSProperties;
}

export function useStyle(): Style | null {
    // return null;  // INLINE STYLES;
    const style: Style = {
        ///
        section: {},
    };
    return style;
}
