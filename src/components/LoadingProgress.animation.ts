import { ComponentAnimation } from "../app/App.base";
import { AnimParams } from "../models/AnimParams";
import { Fade, Ease, Duration } from "../libs/anime+/Constants";

enum AnimKey {
    fadeIn = "fadeIn",
    fadeOut = "fadeOut",
}

export function createAnimation(): LoadingProgressAnimation {
    return new LoadingProgressAnimation();
}

class LoadingProgressAnimation extends ComponentAnimation<AnimKey> {
    ///
    public constructor() {
        super("LoadingProgress");

        ///
        this.define(AnimKey.fadeIn, {
            opacity: Fade.max,
            duration: Duration.oneSecond,
            easing: Ease.linear,
        });

        ///
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

