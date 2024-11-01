import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../models/Theme";

interface Style {
    section: CSSProperties;
}

export function useStyle(): Style {
    return {
        section: {
            willChange: "transform, opacity",
            alignContent: "normal",
            color: ThemeVars.getRef(TV, TV.QuizProgress_color),
            fontFamily: ThemeFont.mono,
            fontWeight: "bold",
            fontSize: CssUnit.rem(3),
            height: CssUnit.cqh(5),
            marginTop: CssUnit.cqh(42),
        },
    };
}

