import { CSSProperties, RefObject, useRef } from "react";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { currentQuizItem, QuizState } from "../models/QuizState";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Ease } from "../libs/anime+/Ease";
import { Lazy } from "../libs/csharp-sim/Lazy";

const config = {
    SECTION_ID: "QuestionImage",
    FADE_DURATION: 500,
};

const style: CSSProperties = {
    alignContent: "normal",
    height: CssUnit.cqh(10),
    top: CssUnit.cqh(5),
};

export function QuestionImage() {
    const [state] = FlowContext.current<QuizState>();
    $QuestionImage.ref = useRef<HTMLDivElement>(null);
    return (
        <section id={config.SECTION_ID} ref={$QuestionImage.ref} style={style}>
            {currentQuizItem(state)?.imageJsx ?? null}
        </section>
    );
}

export class $QuestionImage {
    public static ref: RefObject<HTMLDivElement>;

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
}
