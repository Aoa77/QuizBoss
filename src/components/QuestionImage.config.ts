import { createRef, CSSProperties } from "react";
import { AnimConfig } from "../models/AnimConfig";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV } from "../models/Theme";

export function createConfig(): QuestionImageConfig {
    const config: QuestionImageConfig = {
        ///
        id: "QuestionImage",
        ref: createRef(),

        ///
        enableSecretInput: true,

        ///
        imgStyle: {},
        sectionStyle: {},
    };

    ///
    config.sectionStyle = {
        height: CssUnit.cqh(20),
        marginTop: CssUnit.cqh(15),
    };

    ///
    config.imgStyle = {
        height: config.sectionStyle.height,
        boxShadow: `0 0 ${CssUnit.cqw(16)} ${CssUnit.cqw(3)} ${ThemeVars.getRef(
            TV,
            TV.QuestionImage_shadow,
        )}`,
    };

    ///
    return config;
}

export interface QuestionImageConfig extends AnimConfig {
    enableSecretInput: boolean;
    imgStyle: CSSProperties;
    sectionStyle: CSSProperties;
}
