import { CSSProperties } from "react";
import { ComponentConfig } from "../app/App.config";

export interface LoadingSpinnerConfig extends ComponentConfig {
    cxArray?: number[];
    cy?:number;
    extraDelay?: number;
    loopIteration?: number;
    loopStagger?: number;
    radiusArray?: number[];
    radiusBase?: number;
    svgStyle?: CSSProperties;
    viewBox?: string;
}
