import { CSSProperties } from "react";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { ThemeFont, TV } from "../models/Theme";
import { Ease } from "../libs/anime+/Ease";
import { Duration } from "../models/Duration";

const config = {
    SECTION_ID: "QuizTitle",
    ENABLE_SECRET_RELOAD: true,
    FADE_DURATION: Duration.Fade,
};

const style: CSSProperties = {
    alignContent: "normal",
    fontFamily: ThemeFont.serif,
    fontSize: CssUnit.rem(8),
    height: CssUnit.cqh(10),
    top: CssUnit.cqh(5),
};

export function QuizTitle(props: { text: string }) {
    const themeStyle: CSSProperties = {
        ...style,
        color: ThemeVars.getRef(TV.QuizTitle_color),
    };
    return (
        <section
            id={config.SECTION_ID}
            style={themeStyle}
            onPointerDown={onPointerDown}>
            {props.text}
        </section>
    );
}

async function onPointerDown() {
    if (config.ENABLE_SECRET_RELOAD) {
        window.location.reload();
        return;
    }
}

export class $QuizTitle {
    ///
    public static get fadeIn(): AnimationTask {
        return this._fadeIn.value;
    }
    private static readonly _fadeIn = AnimationTask.createById(
        config.SECTION_ID,
        {
            opacity: [0, 1],
            duration: config.FADE_DURATION,
            easing: Ease.linear,
        },
    );

    ///
    public static get fadeOut(): AnimationTask {
        return this._fadeOut.value;
    }
    private static readonly _fadeOut = AnimationTask.createById(
        config.SECTION_ID,
        {
            opacity: [1, 0],
            duration: config.FADE_DURATION,
            easing: Ease.linear,
        },
    );
}
