import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../models/Theme";

interface Style {
    section: CSSProperties;
    span: CSSProperties;
}

export function useStyle(): Style {
    return {
        section: {
            alignContent: "normal",
            color: ThemeVars.getRef(TV, TV.GuessPoints_CORRECT_color),
            fontFamily: ThemeFont.mono,
            fontWeight: "bold",
            fontSize: CssUnit.rem(3),
            height: CssUnit.cqh(10),
            marginTop: CssUnit.cqh(90),
        },
        span: {
            color: ThemeVars.getRef(TV, TV.QuestionText_color),
            fontWeight: "normal",
        }
    };
}

