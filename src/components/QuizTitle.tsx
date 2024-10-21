import { CSSProperties } from "react";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Ease } from "../libs/anime+/Ease";
import { Lazy } from "../libs/csharp-sim/Lazy";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { ThemeFont, TV } from "../models/Theme";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "../models/QuizState";

const config = {
    SECTION_ID: "QuizTitle",
    ENABLE_SECRET_RELOAD: true,
    FADE_DURATION: 1500,
};

const style: CSSProperties = {
    alignContent: "normal",
    fontFamily: ThemeFont.serif,
    fontSize: CssUnit.rem(7),
    height: CssUnit.cqh(10),
    top: CssUnit.cqh(5),
};

export function QuizTitle() {
    const [state] = FlowContext.current<QuizState>();
    const themeStyle: CSSProperties = {
        ...style,
        color: ThemeVars.getRef(TV.QuizTitle_color),
    };
    return (
        <section
            id={config.SECTION_ID}
            style={themeStyle}
            onPointerDown={onPointerDown}>
            {state.quizModule?.quizData.title}
        </section>
    );
}

async function onPointerDown() {
    if (config.ENABLE_SECRET_RELOAD) {
        window.location.reload();
        return;
    }
}

class QuizTitleAnimation {
    ///
    public get fadeIn(): AnimationTask {
        return this._fadeIn.value;
    }
    private readonly _fadeIn: Lazy<AnimationTask> = AnimationTask.createById(
        config.SECTION_ID,
        {
            opacity: [0, 1],
            duration: config.FADE_DURATION,
            easing: Ease.linear,
        },
    );

    ///
    public get fadeOut(): AnimationTask {
        return this._fadeOut.value;
    }
    private readonly _fadeOut: Lazy<AnimationTask> = AnimationTask.createById(
        config.SECTION_ID,
        {
            opacity: [1, 0],
            duration: config.FADE_DURATION,
            easing: Ease.linear,
        },
    );
}

QuizTitle.animation = new QuizTitleAnimation();
