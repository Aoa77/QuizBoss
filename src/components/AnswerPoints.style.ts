import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../code/Theme";

interface Style {
    section: CSSProperties;
}

export function useStyle(params: { timeBonus: boolean }): Style | null {
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
