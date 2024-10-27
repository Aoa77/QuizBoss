import { LoadingProgressConfig } from "./LoadingProgress.config";
import { AnimParams, ComponentAnimation } from "../app/App.base";
import { Fade, Ease, Duration } from "../libs/anime+/Constants";

enum AnimKey {
    fadeIn = "fadeIn",
    fadeOut = "fadeOut",
}

class LoadingProgressAnimation extends ComponentAnimation<
    LoadingProgressConfig,
    AnimKey
> {
    ///
    public constructor(config: LoadingProgressConfig) {
        super(config);

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

export function createAnimation(
    config: LoadingProgressConfig,
): LoadingProgressAnimation {
    return new LoadingProgressAnimation(config);
}

