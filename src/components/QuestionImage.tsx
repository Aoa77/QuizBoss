import { createRef, CSSProperties, RefObject } from "react";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { currentQuizItem, QuizState } from "../models/QuizState";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Ease } from "../libs/anime+/Ease";
import { Lazy } from "../libs/csharp-sim/Lazy";
import { LoadingSpinner } from "./LoadingSpinner";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { EventName } from "../models/EventName";
import { Task } from "../libs/csharp-sim/Task";

const config = {
    SECTION_ID: "QuestionImage",
    FADE_DURATION: 500,
    ENABLE_SECRET_NEXT_IMAGE: true,
};

const loadingSpinner = LoadingSpinner.animation;
const sectionStyle: CSSProperties = {
    ...loadingSpinner.sectionStyle,
};

const ref: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

export function QuestionImage() {
    const [state] = FlowContext.current<QuizState>();
    let jsx: JSX.Element | null = null;

    const item = currentQuizItem(state);
    if (item !== null) {
        const imgStyle: CSSProperties = {
            height: CssUnit.cqh(loadingSpinner.height),
        };
        jsx = (
            <img
                src={item.imageSrc}
                style={imgStyle}
                alt=""
                onPointerDown={onPointerDown}
            />
        );
    }

    return (
        <section id={config.SECTION_ID} ref={ref} style={sectionStyle}>
            {jsx}
        </section>
    );
}

async function onPointerDown() {
    if (!config.ENABLE_SECRET_NEXT_IMAGE) {
        return;
    }

    const [state, setState] = FlowContext.current<QuizState>();
    if (state.eventName !== EventName.NextQuestion) {
        return;
    }

    const questionImage = QuestionImage.animation;
    await questionImage.end();
    await loadingSpinner.begin();

    ++state.currentItemIndex;
    if (state.currentItemIndex >= state.quizModule!.quizData.items.length) {
        state.currentItemIndex = 0;
    }
    setState({ ...state });
}

class QuestionImageAnimation {
///

    ///
    public async begin(): Promise<void> {
        await this.fadeIn.start();
    }

    ///
    public async end(): Promise<void> {
        await this.scaleOut.start();
        await this.fadeReset.start();
        await this.scaleReset.start();
    }


    ///
    private get fadeIn(): AnimationTask {
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
    private get fadeReset(): AnimationTask {
        return this._fadeReset.value;
    }
    private readonly _fadeReset: Lazy<AnimationTask> = AnimationTask.createById(
        config.SECTION_ID,
        {
            opacity: [1, 0],
            duration: 0,
            easing: Ease.linear,
        },
    );

    ///
    private get scaleOut(): AnimationTask {
        return this._scaleOut.value;
    }
    private readonly _scaleOut: Lazy<AnimationTask> = AnimationTask.createById(
        config.SECTION_ID,
        {
            scale: [1, 0],
            duration: config.FADE_DURATION,
            easing: Ease.inOutBack,
        },
    );

    ///
    private get scaleReset(): AnimationTask {
        return this._scaleReset.value;
    }
    private readonly _scaleReset: Lazy<AnimationTask> = AnimationTask.createById(
        config.SECTION_ID,
        {
            scale: [0, 1],
            duration: 1,
            easing: Ease.linear,
        },
    );
}

QuestionImage.animation = new QuestionImageAnimation();
