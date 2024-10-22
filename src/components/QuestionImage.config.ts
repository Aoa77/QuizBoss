import { CSSProperties } from "react";
import { ComponentConfig } from "../app/App.config";


export interface QuestionImageConfig extends ComponentConfig {
    enableSecretNextImage?: boolean;
    imgStyle?: CSSProperties;
}
