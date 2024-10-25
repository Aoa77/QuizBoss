import { createRef, CSSProperties } from "react";
import { AnimConfig } from "../models/AnimConfig";
import { CssUnit } from "../libs/theme-vars/CssUnit";

export function createConfig(): QuestionImageConfig {
    const config: QuestionImageConfig = {
        ///
        id: "QuestionImage",
        ref: createRef(),
        
        ///
        transitionDuration: 500,
        enableSecretNextImage: true,
        
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
    };

    ///
    return config;
}

export interface QuestionImageConfig extends AnimConfig {
    enableSecretNextImage: boolean;
    imgStyle: CSSProperties;
    sectionStyle: CSSProperties;
    transitionDuration: number;
}
