import { CSSProperties } from "react";
import { SvgThings } from "../libs/theme-vars/SvgThings";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV } from "../models/Theme";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Ease } from "../libs/anime+/Ease";
import { Lazy } from "../libs/csharp-sim/Lazy";
import anime from "animejs";

const config = {
    SECTION_ID: "LoadingSpinner",
    VIEWBOX: [0, 0, 140, 140],
    RADIUS_ARRAY: [10, 5],
    CX_ARRAY: [45, 70, 95],
    CY: 50,
    FADE_DURATION: 250,
    BALL_STAGGER: 420,
};

const sectionStyle: CSSProperties = {
    height: CssUnit.cqh(15),
    top: CssUnit.cqh(15),
};

const svgStyle: CSSProperties = {
    height: sectionStyle.height,
};

export function LoadingSpinner() {
    const viewBox = SvgThings.viewBox(config.VIEWBOX);
    const svgThemeStyle: CSSProperties = {
        ...svgStyle,
        fill: ThemeVars.getRef(TV.LoadingSpinner_fill),
    };

    const balls = config.CX_ARRAY.map((cx, key) => (
        <circle key={key} cx={cx} cy={config.CY} r={config.RADIUS_ARRAY[1]} />
    ));

    return (
        <section id={config.SECTION_ID} style={sectionStyle}>
            <svg
                style={svgThemeStyle}
                viewBox={viewBox}
                xmlns={SvgThings.xmlns}>
                {balls}
            </svg>
        </section>
    );
}

export class $LoadingSpinner {
    ///
    public static get fadeIn(): AnimationTask {
        return this._fadeIn.value;
    }
    private static readonly _fadeIn: Lazy<AnimationTask> =
        AnimationTask.createById(config.SECTION_ID, {
            opacity: [0, 1],
            duration: config.FADE_DURATION,
            easing: Ease.linear,
        });

    ///
    public static get fadeOut(): AnimationTask {
        return this._fadeOut.value;
    }
    private static readonly _fadeOut: Lazy<AnimationTask> =
        AnimationTask.createById(config.SECTION_ID, {
            opacity: [1, 0],
            duration: config.FADE_DURATION,
            easing: Ease.linear,
        });

    ///
    public static get loop(): AnimationTask {
        return this._loop.value;
    }
    private static readonly _loop: Lazy<AnimationTask> =
        AnimationTask.createByQuery(
            `section#${config.SECTION_ID} > svg > circle`,
            {
                keyframes: [
                    { r: config.RADIUS_ARRAY[0] },
                    { r: config.RADIUS_ARRAY[1] },
                ],
                loop: true,
                delay: anime.stagger(config.BALL_STAGGER),
                duration: config.BALL_STAGGER,
                endDelay: (_, i, l) => (i === l - 1 ? 0 : config.BALL_STAGGER),
            },
        );
}
