import { createRef, CSSProperties } from "react";
import { AnimConfig } from "../models/AnimConfig";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV } from "../models/Theme";
import { SvgThings } from "../libs/theme-vars/SvgThings";

export function createConfig(): LoadingSpinnerConfig {
    const config: LoadingSpinnerConfig = {
        ///
        id: "LoadingSpinner",
        ref: createRef(),

        ///
        cxArray: [45, 70, 95],
        cy: 50,
        loopIteration: 700,
        loopStagger: 100,
        radiusArray: [3, 12, 3],
        radiusBase: 5,
        viewBox: SvgThings.viewBox([0, 0, 140, 140]),

        ///
        sectionStyle: {},
        svgStyle: {},
    };

    ///
    config.sectionStyle = {
        height: CssUnit.cqh(20),
        marginTop: CssUnit.cqh(15),
    };

    ///
    config.svgStyle = {
        fill: ThemeVars.getRef(TV, TV.LoadingSpinner_fill),
        height: config.sectionStyle.height,
    };

    ///
    return config;
}

export interface LoadingSpinnerConfig extends AnimConfig {
    cxArray: number[];
    cy: number;
    loopIteration: number;
    loopStagger: number;
    radiusArray: number[];
    radiusBase: number;
    sectionStyle: CSSProperties;
    svgStyle: CSSProperties;
    viewBox: string;
}


