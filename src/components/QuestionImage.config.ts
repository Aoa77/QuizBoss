import { createRef, CSSProperties } from "react";
import { ComponentConfig } from "../app/App.config";
import { CssUnit } from "../libs/theme-vars/CssUnit";

export interface QuestionImageConfig extends ComponentConfig {
    enableSecretNextImage?: boolean;
    imgStyle?: CSSProperties;
}

export function createConfig(): QuestionImageConfig {
    const config: QuestionImageConfig = { ref: createRef() };
    config.animationId = "QuestionImage";
    config.animationDuration = 500;
    config.enableSecretNextImage = true;
    config.sectionStyle = {
        height: CssUnit.cqh(20),
        marginTop: CssUnit.cqh(15),
    };
    config.imgStyle = {
        height: config.sectionStyle.height,
    };
    return config;
}
