import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../models/Theme";

interface Style {
    section: CSSProperties;
}

export function useStyle(): Style {
    const style: Style = {
        section: {},
    };

    ///
    style.section = {
        color: ThemeVars.getRef(TV, TV.QuizProgress_color),
        fontFamily: ThemeFont.mono,
        fontSize: CssUnit.rem(2.3),
        fontWeight: "bold",
        height: CssUnit.cqh(20),
        marginTop: CssUnit.cqh(85),
    };

    ///
    return style;
}
