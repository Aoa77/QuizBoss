import { CSSProperties } from "react";
import { SvgThings } from "../libs/theme-vars/SvgThings";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV } from "../models/Theme";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Ease } from "../libs/anime+/Ease";
import { Lazy } from "../libs/csharp-sim/Lazy";
import anime from "animejs";
import { Task } from "../libs/csharp-sim/Task";

const config = {
    SECTION_ID: "LoadingSpinner",
    VIEWBOX: [0, 0, 140, 140],
    RADIUS_ARRAY: [10, 5],
    CX_ARRAY: [45, 70, 95],
    CX_MOVE: [50, 75, 100],
    CY: 50,
    HEIGHT: 20,

    LOOP_STAGGER: 0,
    LOOP_DURATION: 120,

    FADE_DELAY: 250,
    FADE_DURATION: 200,
    FADE_END_DELAY: 50,
};

const sectionStyle: CSSProperties = {
    height: CssUnit.cqh(config.HEIGHT),
    top: CssUnit.cqh(15),
};

const svgStyle: CSSProperties = {
    height: CssUnit.cqh(1 * config.HEIGHT),
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

class LoadingSpinnerAnimation {
    ///
    private _loopStarted = false;
    public readonly height: number;
    public readonly sectionStyle: CSSProperties;
    public constructor(height: number, sectionStyle: CSSProperties) {
        this.height = height;
        this.sectionStyle = sectionStyle;
    }

    ///
    public async begin(): Promise<void> {
        await this.fadeIn.start();
        if (!this._loopStarted) {
            this._loopStarted = true;
            this.loop.start();
        }
        // await Task.delay(999999);
    }

    ///
    public async end(): Promise<void> {
        await this.fadeOut.start();
    }

    ///
    private get fadeIn(): AnimationTask {
        return this._fadeIn.value;
    }
    private readonly _fadeIn: Lazy<AnimationTask> = AnimationTask.createById(
        config.SECTION_ID,
        {
            opacity: [0, 1],
            delay: config.FADE_DELAY,
            duration: config.FADE_DURATION,
            easing: Ease.linear,
            endDelay: config.FADE_END_DELAY,
        },
    );

    ///
    private get fadeOut(): AnimationTask {
        return this._fadeOut.value;
    }
    private readonly _fadeOut: Lazy<AnimationTask> = AnimationTask.createById(
        config.SECTION_ID,
        {
            opacity: [1, 0],
            delay: config.FADE_DELAY,
            duration: config.FADE_DURATION,
            easing: Ease.linear,
        },
    );

    ///
    private get loop(): AnimationTask {
        return this._loop.value;
    }
    private readonly _loop: Lazy<AnimationTask> = AnimationTask.createByQuery(
        `section#${config.SECTION_ID} > svg > circle`,
        {
            r: [5,10,5],
            loop: true,
            // direction: "alternate",
            delay: anime.stagger(250),
            duration: 500,
            easing: Ease.linear,
        },
    );
}

LoadingSpinner.animation = new LoadingSpinnerAnimation(
    config.HEIGHT,
    sectionStyle,
);
