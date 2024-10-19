import { AnimationTask, EASING } from "../libs/AnimationTask";
import "./QuizTitle.css";

const config = {
    ANIMATION_ID: "QuizTitle",
    ENABLE_SECRET_RELOAD: true,
};

export function QuizTitle(props: { text: string }) {
    return (
        <section id={config.ANIMATION_ID} onPointerDown={onPointerDown}>
            {props.text}
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
