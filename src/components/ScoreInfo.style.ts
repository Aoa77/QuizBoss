import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../code/style";

interface Style {
    section: CSSProperties;
    span: CSSProperties;
}

export function useStyle(): Style | null {
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
