import { createRef, CSSProperties, RefObject } from "react";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { currentQuizItem, QuizState } from "../models/QuizState";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Ease } from "../libs/anime+/Ease";
import { Lazy } from "../libs/csharp-sim/Lazy";
import { LoadingSpinner } from "./LoadingSpinner";

const config = {
    SECTION_ID: "QuestionImage",
    FADE_DURATION: 500,
};

const loadingSpinner = LoadingSpinner.animation;
const sectionStyle: CSSProperties = {
    ...loadingSpinner.sectionStyle,
};

const ref: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

export function QuestionImage() {
    const [state] = FlowContext.current<QuizState>();
    return (
        <section id={config.SECTION_ID} ref={ref} style={sectionStyle}>
            {currentQuizItem(state)?.imageJsx ?? null}
        </section>
    );
}

class QuestionImageAnimation {
    ///
    public readonly ref: RefObject<HTMLDivElement>;
    public constructor(ref: RefObject<HTMLDivElement>) {
        this.ref = ref;
    }

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

QuestionImage.animation = new QuestionImageAnimation(ref);
