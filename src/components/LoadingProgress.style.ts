import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../code/Theme";

interface Style {
    progBarBackground: CSSProperties;
    progBarForeground: CSSProperties;
    section: CSSProperties;
}

export function useStyle(): Style {
    const style: Style = {
        progBarBackground: {},
        progBarForeground: {},
        section: {},
    };

    ///
    style.section = {
        color: ThemeVars.getRef(TV, TV.LoadingProgress_TEXT_color),
        fontFamily: ThemeFont.mono,
        fontSize: CssUnit.rem(3),
        fontWeight: "bold",
        height: CssUnit.cqh(2),
        marginTop: CssUnit.cqh(15),
    };

    ///
    style.progBarBackground = {
        backgroundColor: ThemeVars.getRef(TV, TV.LoadingProgress_BAR_backgroundColor),
        width: CssUnit.cqw(44),
        height: CssUnit.cqh(0.25),
        margin: "auto",
        marginTop: CssUnit.cqh(1.2),
    };

    ///
    style.progBarForeground = {
        backgroundColor: ThemeVars.getRef(TV, TV.LoadingProgress_BAR_color),
        width: ThemeVars.getRef(TV, TV.LoadingProgress_BAR_width),
        height: "100%",
    };

    ///
    return style;
}
