import { createRef, CSSProperties } from "react";
import { ComponentConfig } from "../app/App.config";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../models/Theme";

export interface LoadingProgressConfig extends ComponentConfig {
    progBarBackground?: CSSProperties;
    progBarCompleted?: CSSProperties;
}

export function createConfig(): LoadingProgressConfig {
    const config: LoadingProgressConfig = { ref: createRef() };
    config.animationId = "LoadingProgress";
    config.animationDuration = 1000;

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
    config.progBarCompleted = {
        backgroundColor: ThemeVars.getRef(TV, TV.LoadingProgress_BAR_color),
        width: ThemeVars.getRef(TV, TV.LoadingProgress_BAR_width),
        height: "100%",
    };

    return config;
}
