import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../models/Theme";


export interface StyleConfig  {
    sectionStyle: CSSProperties;
    spanStyle: CSSProperties;
}


export function createStyles() : StyleConfig {

    const config: StyleConfig = {
        sectionStyle: {},
        spanStyle: {},
    };
    ///
    config.sectionStyle = {
        alignContent: "normal",
        marginTop: CssUnit.cqh(45),
        opacity: 1,
        textAlign: "center",
    };

    config.spanStyle = {
        alignContent: "center",
        backgroundColor: ThemeVars.getRef(TV, TV.GuessButton_NORMAL_backgroundColor),
        color: ThemeVars.getRef(TV, TV.GuessButton_NORMAL_color),
        display: "block",

        fontFamily: ThemeFont.sans,
        fontSize: CssUnit.rem(2.5),

        margin: "0 auto",
        marginBottom: CssUnit.cqh(3),

        width: CssUnit.cqw(60),
        height: CssUnit.cqh(7),
    };
    return config;
}
