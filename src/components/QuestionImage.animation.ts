import { AnimParams, ComponentAnimation } from "../app/App.base";
import { Duration, Ease, Fade, Scale } from "../libs/anime+/Constants";
import { QuestionImageConfig } from "./QuestionImage.config";

enum AnimKey {
    fadeIn = "fadeIn",
    fadeOut = "fadeOut",
    zoomOut = "zoomOut",
}

class QuestionImageAnimation extends ComponentAnimation<QuestionImageConfig, AnimKey> {
    ///
    public constructor(config: QuestionImageConfig) {
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

        this.define(AnimKey.zoomOut, {
            scale: Scale.zero,
            duration: Duration.oneSecond,
            easing: Ease.inOutBack,
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
        const anim = this.build(AnimKey.zoomOut, params.enable, params);
        if (anim) {
            await anim.run();
        }
        this.setOpacity(Fade.min);
        this.setScale(Scale.one);
    }
}

export function createAnimation(config: QuestionImageConfig): QuestionImageAnimation {
    return new QuestionImageAnimation(config);
}
