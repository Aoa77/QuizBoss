import { createRef, CSSProperties } from "react";
import { AnimConfig } from "../models/AnimConfig";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../models/Theme";

export function createConfig(): QuizTitleConfig {
    return {
        ///
        id: "QuizTitle",
        ref: createRef(),

        ///
        enableSecretReload: true,

        ///
        style: {
            alignContent: "normal",
            color: ThemeVars.getRef(TV, TV.QuizTitle_color),
            fontFamily: ThemeFont.serif,
            fontSize: CssUnit.rem(7),
            height: CssUnit.cqh(10),
            marginTop: CssUnit.cqh(5),
        },
    };
}

export interface QuizTitleConfig extends AnimConfig {
    enableSecretReload: boolean;
    style: CSSProperties;
}
