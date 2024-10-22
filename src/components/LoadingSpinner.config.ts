import { CSSProperties } from "react";

export interface LoadingSpinnerConfig {
    animationId?: string;
    cxArray?: number[];
    cy?:number;
    extraDelay?: number;
    fadeDelay?: number;
    fadeDuration?: number;
    fadeEndDelay?: number;
    loopIteration?: number;
    loopStagger?: number;
    radiusArray?: number[];
    radiusBase?: number;
    sectionHeight?: number;
    sectionMarginTop?: number;
    sectionStyle?: CSSProperties;
    svgStyle?: CSSProperties;
    textStyle?: CSSProperties;
    viewBox?: string;
}
