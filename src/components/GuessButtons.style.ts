import { CSSProperties } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV, ThemeFont } from "../models/Theme";
import { ButtonStyle } from "../models/ButtonStyle";

interface Style {
    section: CSSProperties;
    span: CSSProperties;
    button: Map<ButtonStyle, CSSProperties>;
}

export function useStyle(): Style {
    ///
    const style: Style = {
        section: {},
        span: {},
        button: new Map<ButtonStyle, CSSProperties>(),
    };

    ///
    style.section = {
        alignContent: "normal",
        marginTop: CssUnit.cqh(46),
        opacity: 1,
        textAlign: "center",
    };

    ///
    style.span = {
        willChange: "transform, opacity",
        alignContent: "center",
        borderStyle: "solid",
        borderRadius: CssUnit.rem(1),
        borderWidth: CssUnit.rem(1),
        cursor: "pointer",
        display: "block",
        opacity: 0,

        fontFamily: ThemeFont.sans,
        fontSize: CssUnit.rem(3),
        margin: "0 auto",
        marginBottom: CssUnit.cqh(3.4),

        width: CssUnit.cqw(62),
        height: CssUnit.cqh(7),
    };

    style.button.set(ButtonStyle.normal, {
        backgroundColor: ThemeVars.getRef(TV, TV.GuessButton_NORMAL_backgroundColor),
        borderColor: ThemeVars.getRef(TV, TV.GuessButton_NORMAL_borderColor),
        color: ThemeVars.getRef(TV, TV.GuessButton_NORMAL_color),
    });

    style.button.set(ButtonStyle.dimmed, {
        backgroundColor: ThemeVars.getRef(TV, TV.GuessButton_DIMMED_backgroundColor),
        borderColor: ThemeVars.getRef(TV, TV.GuessButton_DIMMED_borderColor),
        color: ThemeVars.getRef(TV, TV.GuessButton_DIMMED_color),
    });
    style.button.set(ButtonStyle.disabled, style.button.get(ButtonStyle.dimmed)!);

    style.button.set(ButtonStyle.correct, {
        backgroundColor: ThemeVars.getRef(TV, TV.GuessButton_CORRECT_backgroundColor),
        borderColor: ThemeVars.getRef(TV, TV.GuessButton_CORRECT_borderColor),
        color: ThemeVars.getRef(TV, TV.GuessButton_CORRECT_color),
    });

    style.button.set(ButtonStyle.wrong, {
        backgroundColor: ThemeVars.getRef(TV, TV.GuessButton_WRONG_backgroundColor),
        borderColor: ThemeVars.getRef(TV, TV.GuessButton_WRONG_borderColor),
        color: ThemeVars.getRef(TV, TV.GuessButton_WRONG_color),
    });

    style.button.set(ButtonStyle.reveal, {
        backgroundColor: ThemeVars.getRef(TV, TV.GuessButton_REVEAL_backgroundColor),
        borderColor: ThemeVars.getRef(TV, TV.GuessButton_REVEAL_borderColor),
        color: ThemeVars.getRef(TV, TV.GuessButton_REVEAL_color),
    });

    ///
    return style;
}
