import { ComponentAnimation } from "../app/App.base";
import { Ease, Fade, Scale } from "../libs/anime+/Constants";
import { QuestionImageConfig } from "./QuestionImage.config";

enum AnimKey {
    fadeIn = "fadeIn",
    zoomOut = "zoomOut",
}

class QuestionImageAnimation extends ComponentAnimation<
    QuestionImageConfig,
    AnimKey
> {
    ///
    public constructor(config: QuestionImageConfig) {
        super(config);

        this.create(AnimKey.fadeIn, {
            opacity: Fade.max,
            duration: config.transitionDuration,
            easing: Ease.linear,
        });

        this.create(AnimKey.zoomOut, {
            scale: Scale.zero,
            duration: config.transitionDuration,
            easing: Ease.inOutBack,
        });
    }

    ///
    public in(): Promise<void> {
        return this.run(AnimKey.fadeIn);
    }

    ///
    public async out(): Promise<void> {
        await this.run(AnimKey.zoomOut);
        this.setOpacity(Fade.min);
        this.setScale(Scale.one);
    }
}

export function createAnimation(
    config: QuestionImageConfig,
): QuestionImageAnimation {
    return new QuestionImageAnimation(config);
}
