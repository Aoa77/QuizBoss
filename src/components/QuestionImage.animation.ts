import { AnimParams, ComponentAnimation } from "../app/App.base";
import { Duration, Ease, Fade, Scale } from "../libs/anime+/Constants";
import { TaskGroup } from "../libs/friendlies/Task";
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
        const scale = this.build(AnimKey.zoomOut, params.enable, params);
        if (!scale) {
            return;
        }
        const fade = this.build(AnimKey.fadeOut, params.enable, {
            ...params,
            delay: 0.01 * params.duration,
            duration: 0.75 * params.duration,
        });
        if (!fade) {
            return;
        }
        const anim = TaskGroup.create();
        anim.add(scale.run());
        anim.add(fade.run());
        await anim.all();
        this.setScale(Scale.one);
    }
}

export function createAnimation(config: QuestionImageConfig): QuestionImageAnimation {
    return new QuestionImageAnimation(config);
}
