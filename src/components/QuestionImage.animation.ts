import { AnimeParams } from "animejs";
import { ComponentAnimation } from "../app/App.base";
import { Duration, Ease, Fade, Scale } from "../libs/anime+/Constants";
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

        this.define(AnimKey.fadeIn, {
            opacity: Fade.max,
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
    public async in(overrides?: AnimeParams): Promise<void> {
        const anim = this.build(AnimKey.fadeIn, overrides);
        await anim.run();
    }

    ///
    public async out(overrides?: AnimeParams): Promise<void> {
        const anim = this.build(AnimKey.zoomOut, overrides);
        await anim.run();
        this.setOpacity(Fade.min);
        this.setScale(Scale.one);
    }
}

export function createAnimation(
    config: QuestionImageConfig,
): QuestionImageAnimation {
    return new QuestionImageAnimation(config);
}
