import { AnimParams, ComponentAnimation } from "../app/App.base";
import { Duration, Ease, Fade } from "../libs/anime+/Constants";
import { QuizTitleConfig } from "./QuizTitle.config";

enum AnimKey {
    fadeIn = "fadeIn",
    fadeOut = "fadeOut",
}

class QuizTitleAnimation extends ComponentAnimation<QuizTitleConfig, AnimKey> {
    ///
    public constructor(config: QuizTitleConfig) {
        super(config);

        this.define(AnimKey.fadeIn, {
            opacity: Fade.max,
            duration: Duration.oneSecond,
            easing: Ease.linear,
        });

        this.define(AnimKey.fadeOut, {
            opacity: Fade.min,
            duration: Duration.oneSecond,
            easing: Ease.linear,
        });
    }

    ///
    public async in(params: AnimParams): Promise<void> {
        const anim = this.build(AnimKey.fadeIn, params.enable, params);
        if (anim) {
            await anim.run();
        }
    }

    ///
    public async out(params: AnimParams): Promise<void> {
        const anim = this.build(AnimKey.fadeOut, params.enable, params);
        if (anim) {
            await anim.run();
        }
    }
}

export function createAnimation(config: QuizTitleConfig): QuizTitleAnimation {
    return new QuizTitleAnimation(config);
}
