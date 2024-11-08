import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../models/Theme";

interface Style {
    section: CSSProperties;
}

export function useStyle(): Style {
    return {
        ///
        section: {
            alignContent: "normal",
            color: ThemeVars.getRef(TV, TV.QuizTitle_color),
            fontFamily: ThemeFont.serif,
            fontSize: CssUnit.rem(6.5),
            height: CssUnit.cqh(10),
            marginTop: CssUnit.cqh(4),
        },
    };
}
