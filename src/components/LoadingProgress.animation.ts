import { LoadingProgressConfig } from "./LoadingProgress.config";
import { ComponentAnimation } from "../app/App.base";
import { Fade, Ease, Duration } from "../libs/anime+/Constants";
import { AnimeParams } from "animejs";

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
    public async in(overrides?: AnimeParams): Promise<void> {
        const anim = this.build(AnimKey.fadeIn, overrides);
        await anim.run();
    }

    ///
    public async out(overrides?: AnimeParams): Promise<void> {
        const anim = this.build(AnimKey.fadeOut, overrides);
        await anim.run();
    }
}

export function createAnimation(
    config: LoadingProgressConfig,
): LoadingProgressAnimation {
    return new LoadingProgressAnimation(config);
}
