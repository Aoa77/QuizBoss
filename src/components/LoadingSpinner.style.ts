import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV } from "../code/Theme";
import { SvgThings } from "../libs/theme-vars/SvgThings";

interface Style {
    cxArray: number[];
    cy: number;
    radiusBase: number;
    section: CSSProperties;
    svg: CSSProperties;
    viewBox: string;
}

export function useStyle(): Style | null {
    // return null;  // INLINE STYLES;
    const style: Style = {
        ///
        cxArray: [45, 70, 95],
        cy: 50,
        radiusBase: 5,
        viewBox: SvgThings.viewBox([0, 0, 140, 140]),

        ///
        section: {},
        svg: {},
    };

    ///
    style.section = {
        height: CssUnit.cqh(20),
        marginTop: CssUnit.cqh(15),
    };

    ///
    style.svg = {
        fill: ThemeVars.getRef(TV, TV.LoadingSpinner_fill),
        height: style.section.height,
    };

    ///
    return style;
}
