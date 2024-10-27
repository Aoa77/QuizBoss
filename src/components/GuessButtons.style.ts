import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../models/Theme";

interface Style {
    section: CSSProperties;
    span: CSSProperties;
}

export function useStyle(): Style {
    ///
    const style: Style = {
        section: {},
        span: {},
    };

    ///
    style.section = {
        alignContent: "normal",
        marginTop: CssUnit.cqh(45),
        opacity: 1,
        textAlign: "center",
    };

    ///
    style.span = {
        
        backgroundColor: ThemeVars.getRef(TV, TV.GuessButton_NORMAL_backgroundColor),
        borderColor: ThemeVars.getRef(TV, TV.GuessButton_NORMAL_borderColor),
        color: ThemeVars.getRef(TV, TV.GuessButton_NORMAL_color),
        
        alignContent: "center",
        borderStyle: "solid",
        borderRadius: CssUnit.rem(1),
        borderWidth: CssUnit.rem(1),
        cursor: "pointer",
        display: "block",
        opacity: 0,

        fontFamily: ThemeFont.sans,
        fontSize: CssUnit.rem(2.5),

        margin: "0 auto",
        marginBottom: CssUnit.cqh(3),

        width: CssUnit.cqw(60),
        height: CssUnit.cqh(7),
    };

    ///
    return style;
}