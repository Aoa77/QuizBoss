import { CSSProperties } from "react";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { ThemeFont, TV } from "../models/Theme";

const config = {
    ANIMATION_ID: "QuizTitle",
    ENABLE_SECRET_RELOAD: true,
};

export function QuizTitle(props: { text: string }) {
    const style: CSSProperties = {
        alignContent: "normal",
        color: ThemeVars.getRef(TV.QuizTitle_text),
        fontFamily: ThemeFont.serif,
        fontSize: CssUnit.rem(8),
        height: CssUnit.cqh(10),
        top: CssUnit.cqh(5),
    };
    return (
        <section
            id={config.ANIMATION_ID}
            style={style}
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
        config.ANIMATION_ID,
        {
            opacity: [0, 1],
            duration: 500,
        },
    );

    ///
    public static get fadeOut(): AnimationTask {
        return this._fadeOut.value;
    }
    private static readonly _fadeOut = AnimationTask.createById(
        config.ANIMATION_ID,
        {
            opacity: [1, 0],
            duration: 500,
        },
    );
}
