import { CSSProperties } from "react";
import { ComponentConfig } from "../app/App.config";

export interface LoadingProgressConfig extends ComponentConfig {
    progBarBackground?: CSSProperties;
    progBarCompleted?: CSSProperties;
}
