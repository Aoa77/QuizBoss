import { createRef, CSSProperties } from "react";
import { AnimConfig } from "../models/AnimConfig";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../models/Theme";

export function createConfig(): GuessButtonsConfig {
    const config: GuessButtonsConfig = {
        ///
        id: "GussButtons",
        ref: createRef(),

        ///
        sectionStyle: {},
        spanStyle: {},
    };

    ///
    config.sectionStyle = {
        alignContent: "normal",
        marginTop: CssUnit.cqh(45),
        opacity: 1,
        textAlign : "center",
    };
    
    config.spanStyle = {
        alignContent: "center",
        backgroundColor: ThemeVars.getRef(TV, TV.GuessButton_backgroundColor),
        color: ThemeVars.getRef(TV, TV.GuessButton_color),
        display: "block",
        
        fontFamily: ThemeFont.sans,
        fontSize: CssUnit.rem(2.5),

        margin: "0 auto",
        marginBottom: CssUnit.cqh(3),
        
        width: CssUnit.cqw(60),
        height:CssUnit.cqh(7),

    };

    ///
    return config;
}

export interface GuessButtonsConfig extends AnimConfig {
    sectionStyle: CSSProperties;
    spanStyle: CSSProperties;
}
