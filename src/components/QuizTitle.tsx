import { AsyncAnimation, EASING } from "../libs/AsyncAnimation";
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
    await $QuizTitle.fadeIn.startAsync();
    await $QuizTitle.fadeOut.startAsync();
    return;

    if (config.ENABLE_SECRET_RELOAD) {
        window.location.reload();
        return;
    }
}

export class $QuizTitle {
    ///
    public static get fadeIn(): AsyncAnimation {
        return this._fadeIn.value;
    }
    private static readonly _fadeIn = AsyncAnimation.createById(
        config.ANIMATION_ID,
        {
            opacity: [0, 1],
            duration: 500,
            easing: EASING.easeInOutSine,
        },
    );
    
    ///
    public static get fadeOut(): AsyncAnimation {
        return this._fadeOut.value;
    }
    private static readonly _fadeOut = AsyncAnimation.createById(
        config.ANIMATION_ID,
        {
            opacity: [1, 0],
            duration: 500,
            easing: EASING.easeInOutSine,
        },
    );
}
