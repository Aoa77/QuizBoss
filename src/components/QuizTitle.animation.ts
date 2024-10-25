import { ComponentAnimation } from "../app/App.base";
import { Ease, Fade } from "../libs/anime+/Constants";
import { QuizTitleConfig } from "./QuizTitle.config";

enum AnimKey {
    fadeIn = "fadeIn",
}

class QuizTitleAnimation extends ComponentAnimation<QuizTitleConfig, AnimKey> {
    ///
    public constructor(config: QuizTitleConfig) {
        super(config);

        this.create(AnimKey.fadeIn, {
            opacity: Fade.max,
            duration: config.animationDuration,
            easing: Ease.linear,
        });
    }

    ///
    public in(): Promise<void> {
        return this.run(AnimKey.fadeIn);
    }

    ///
    public out(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export function createAnimation(config: QuizTitleConfig): QuizTitleAnimation {
    return new QuizTitleAnimation(config);
}
