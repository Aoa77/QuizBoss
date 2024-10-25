import { createRef, CSSProperties } from "react";
import { AnimConfig } from "../models/AnimConfig";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../models/Theme";

export function createConfig(): LoadingProgressConfig {
    const config: LoadingProgressConfig = {
        ///
        id: "LoadingSpinner",
        ref: createRef(),

        ///
        transitionDuration: 1000,
        progBarBackground: {},
        progBarForeground: {},
        sectionStyle: {},
    };

    ///
    config.sectionStyle = {
        color: ThemeVars.getRef(TV, TV.LoadingProgress_TEXT_color),
        fontFamily: ThemeFont.mono,
        fontSize: CssUnit.rem(2),
        fontWeight: "bold",
        height: CssUnit.cqh(20),
        marginTop: CssUnit.cqh(15),
    };

    ///
    config.progBarBackground = {
        backgroundColor: ThemeVars.getRef(
            TV,
            TV.LoadingProgress_BAR_backgroundColor,
        ),
        width: CssUnit.cqw(33),
        height: CssUnit.cqh(0.3),
        margin: "auto",
        marginTop: CssUnit.cqh(1.2),
    };

    ///
    config.progBarForeground = {
        backgroundColor: ThemeVars.getRef(TV, TV.LoadingProgress_BAR_color),
        width: ThemeVars.getRef(TV, TV.LoadingProgress_BAR_width),
        height: "100%",
    };

    ///
    return config;
}

export interface LoadingProgressConfig extends AnimConfig {
    transitionDuration: number;
    progBarBackground: CSSProperties;
    progBarForeground: CSSProperties;
    sectionStyle: CSSProperties;
}
