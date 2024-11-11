import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../code/Theme";

interface Style {
    section: CSSProperties;
}

export function useStyle(): Style | null {
    return null;
    return {
        section: {
            alignContent: "normal",
            color: ThemeVars.getRef(TV, TV.QuestionText_color),
            fontFamily: ThemeFont.sans,
            fontSize: CssUnit.rem(3.3),
            marginTop: CssUnit.cqh(37),
        },
    };
}
