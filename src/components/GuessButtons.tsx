import { CSSProperties } from "react";
import { useAppContext } from "../app/context";
import { ANIM } from "../code/animation";
import { ButtonState } from "../code/game";
import { SectionStyle, ThemeFont, TV } from "../code/style";
import { TriggerGuess } from "../events/TriggerGuess";
import { useAnimeRefs } from "../libs/anime-context/hooks";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";

export function GuessButtons() {
    const { state, settings } = useAppContext();
    const { guessButtonCount } = settings;
    const { buttonAnswerMap } = state;
    const style = useStyle();
    const animations = useAnimeRefs(
        ANIM.GuessButton,
        guessButtonCount,
    );
    
    const buttonJsx = [];
    for (let bidx = 0; bidx < guessButtonCount; bidx++) {
        const item = buttonAnswerMap[bidx];
        if (!item) {
            continue;
        }

        const buttonText = item.name;
        const buttonStyle = {
            ...style?.span, //////////
            ...style?.button.get(item.buttonStyle),
        };

        const anim = animations[bidx];
        buttonJsx.push(
            <span
                id={anim.id}
                key={anim.id}
                style={buttonStyle}
                onPointerDown={() => onPointerDown(bidx)}>
                {buttonText}
            </span>,
        );
    }

    return <section style={style?.section}>{buttonJsx}</section>;
}

function onPointerDown(bidx: number) {
    TriggerGuess(bidx);
}


interface Style extends SectionStyle {
    span: CSSProperties;
    button: Map<ButtonState, CSSProperties>;
}

function useStyle(): Style | null{
    // return null;  // INLINE STYLES;
    ///
    const style: Style = {
        section: {},
        span: {},
        button: new Map<ButtonState, CSSProperties>(),
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

    style.button.set(ButtonState.normal, {
        backgroundColor: ThemeVars.getRef(TV, TV.GuessButton_NORMAL_backgroundColor),
        borderColor: ThemeVars.getRef(TV, TV.GuessButton_NORMAL_borderColor),
        color: ThemeVars.getRef(TV, TV.GuessButton_NORMAL_color),
    });

    style.button.set(ButtonState.dimmed, {
        backgroundColor: ThemeVars.getRef(TV, TV.GuessButton_DIMMED_backgroundColor),
        borderColor: ThemeVars.getRef(TV, TV.GuessButton_DIMMED_borderColor),
        color: ThemeVars.getRef(TV, TV.GuessButton_DIMMED_color),
    });
    style.button.set(ButtonState.disabled, style.button.get(ButtonState.dimmed)!);

    style.button.set(ButtonState.correct, {
        backgroundColor: ThemeVars.getRef(TV, TV.GuessButton_CORRECT_backgroundColor),
        borderColor: ThemeVars.getRef(TV, TV.GuessButton_CORRECT_borderColor),
        color: ThemeVars.getRef(TV, TV.GuessButton_CORRECT_color),
    });

    style.button.set(ButtonState.wrong, {
        backgroundColor: ThemeVars.getRef(TV, TV.GuessButton_WRONG_backgroundColor),
        borderColor: ThemeVars.getRef(TV, TV.GuessButton_WRONG_borderColor),
        color: ThemeVars.getRef(TV, TV.GuessButton_WRONG_color),
    });

    style.button.set(ButtonState.reveal, {
        backgroundColor: ThemeVars.getRef(TV, TV.GuessButton_REVEAL_backgroundColor),
        borderColor: ThemeVars.getRef(TV, TV.GuessButton_REVEAL_borderColor),
        color: ThemeVars.getRef(TV, TV.GuessButton_REVEAL_color),
    });

    ///
    return style;
}
