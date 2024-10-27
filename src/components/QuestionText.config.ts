import { createRef, CSSProperties } from "react";
import { AnimConfig } from "../models/AnimConfig";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../models/Theme";

export function createConfig(): QuestionTextConfig {
    return {
        ///
        id: "QuestionText",
        ref: createRef(),

        ///
        style: {
            alignContent: "normal",
            color: ThemeVars.getRef(TV, TV.QuestionText_color),
            fontFamily: ThemeFont.sans,
            fontSize: CssUnit.rem(3),
            height: CssUnit.cqh(10),
            marginTop: CssUnit.cqh(37),
        },
    };
}

export interface QuestionTextConfig extends AnimConfig {
    style: CSSProperties;
}
