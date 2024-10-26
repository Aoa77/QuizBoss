import { createRef } from "react";
import { AnimConfig } from "../models/AnimConfig";

export function createConfig(index: number): GuessButtonsConfig {
    const config: GuessButtonsConfig = {
        ///
        id: `GuessButton_${index}`,
        ref: createRef(),
    };


    ///
    return config;
}

export interface GuessButtonsConfig extends AnimConfig {
    placeholder?: string;
}

