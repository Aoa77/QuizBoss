import { LoadingProgressConfig } from "./LoadingProgress.config";
import { ComponentAnimation } from "../app/App.base";
import { Fade, Ease } from "../libs/anime+/Constants";

enum AnimKey {
    fadeId = "fadeId",
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
        this.create(AnimKey.fadeId, {
            opacity: Fade.max,
            duration: config.transitionDuration,
            easing: Ease.linear,
        });

        ///
        this.create(AnimKey.fadeOut, {
            opacity: Fade.min,
            duration: config.transitionDuration,
            easing: Ease.linear,
        });
    }

    ///
    public in(): Promise<void> {
        return this.run(AnimKey.fadeId);
    }

    ///
    public out(): Promise<void> {
        return this.run(AnimKey.fadeOut);
    }
}

export function createAnimation(
    config: LoadingProgressConfig,
): LoadingProgressAnimation {
    return new LoadingProgressAnimation(config);
}
