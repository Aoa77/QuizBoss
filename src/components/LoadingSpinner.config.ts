import { createRef, CSSProperties } from "react";
import { ComponentConfig } from "../app/App.base";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { SvgThings } from "../libs/theme-vars/SvgThings";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV } from "../models/Theme";

export interface LoadingSpinnerConfig extends ComponentConfig {
    cxArray?: number[];
    cy?: number;
    delayBeforeProgressBar?: number;
    loopIteration?: number;
    loopStagger?: number;
    radiusArray?: number[];
    radiusBase?: number;
    svgStyle?: CSSProperties;
    viewBox?: string;
}

export function createConfig(): LoadingSpinnerConfig {
    const config: LoadingSpinnerConfig = { ref: createRef() };
    config.animationId = "LoadingSpinner";
    config.cxArray = [45, 70, 95];
    config.cy = 50;
    config.delayBeforeProgressBar = 2000;
    config.animationDuration = 1000;
    config.loopIteration = 700;
    config.loopStagger = 100;
    config.radiusArray = [3, 12, 3];
    config.radiusBase = 5;
    config.viewBox = SvgThings.viewBox([0, 0, 140, 140]);

    config.sectionStyle = {
        height: CssUnit.cqh(20),
        marginTop: CssUnit.cqh(15),
    };

    config.svgStyle = {
        fill: ThemeVars.getRef(TV, TV.LoadingSpinner_fill),
        height: CssUnit.cqh(20),
    };

    return config;
}
