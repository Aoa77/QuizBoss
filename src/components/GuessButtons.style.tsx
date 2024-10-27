import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../models/Theme";

export interface StyleConfig {
    section: CSSProperties;
    span: CSSProperties;
}

export function createStyles(): StyleConfig {
    ///
    const config: StyleConfig = {
        section: {},
        span: {},
    };

    ///
    config.section = {
        alignContent: "normal",
        marginTop: CssUnit.cqh(45),
        opacity: 1,
        textAlign: "center",
    };

    ///
    config.span = {
        
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
    return config;
}
