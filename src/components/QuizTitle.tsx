import { CSSProperties } from "react";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { EASING } from "../libs/anime+/EASING";
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
        backgroundColor: "red",//ThemeVars.getRef(TV.titleBackground),
        color: ThemeVars.getRef(TV.titleHeading),
        fontFamily: ThemeFont.serif,
        fontSize: CssUnit.rem(10),
        height: CssUnit.cqh(10),
        top: CssUnit.cqh(5),
    };
    const text = "World Flags Quiz";
    return (
        <section
            id={config.ANIMATION_ID}
            style={style}
            onPointerDown={onPointerDown}>
            {text}
        </section>
    );
}

async function onPointerDown() {
    await $QuizTitle.fadeIn.start();
    await $QuizTitle.fadeOut.start();
    return;

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
            easing: EASING.easeInOutSine,
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
            easing: EASING.easeInOutSine,
        },
    );
}
