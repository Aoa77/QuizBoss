import { createRef } from "react";
import { ComponentConfig } from "../app/App.base";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../models/Theme";

export interface QuizTitleConfig extends ComponentConfig {
    enableSecretReload?: boolean;
}

export function createConfig(): QuizTitleConfig {
    const config: QuizTitleConfig = { ref: createRef() };
    config.animationId = "QuizTitle";
    config.enableSecretReload = true;
    config.animationDuration = 1500;
    config.sectionStyle = {
        alignContent: "normal",
        color: ThemeVars.getRef(TV, TV.QuizTitle_color),
        fontFamily: ThemeFont.serif,
        fontSize: CssUnit.rem(7),
        height: CssUnit.cqh(10),
        marginTop: CssUnit.cqh(5),
    };
    return config;
}
