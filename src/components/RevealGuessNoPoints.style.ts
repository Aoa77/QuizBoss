import { CSSProperties } from "react";
import { useStyle as baseStyle } from "../components/CorrectGuessPoints.style";

interface Style {
    section: CSSProperties;
}

export function useStyle(): Style {
    return { ...baseStyle() };
}
