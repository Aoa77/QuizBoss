import { CSSProperties } from "react";
import { useStyle as baseStyle } from "../components/CorrectGuessPoints.style";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV } from "../models/Theme";

interface Style {
    section: CSSProperties;
}

export function useStyle(): Style {
    const style = baseStyle();
    style.section.color = ThemeVars.getRef(TV, TV.RevealGuessNoPoints_color);
    return style;
}
