import anime from "animejs";
import { Ease, Fade } from "../libs/anime+/Constants";
import { LoadingSpinnerConfig } from "./LoadingSpinner.config";
import { ComponentAnimation } from "../app/App.base";

enum AnimKey {
    fadeIn = "fadeIn",
    fadeOut = "fadeOut",
    loop = "loop",
}

class LoadingSpinnerAnimation extends ComponentAnimation<
    LoadingSpinnerConfig,
    AnimKey
> {
    ///
    public constructor(config: LoadingSpinnerConfig) {
        ///
        super(config);

        ///
        this.create(AnimKey.fadeIn, {
            opacity: Fade.max,
            duration: config.fadeDuration,
            easing: Ease.linear,
        });

        ///
        this.create(AnimKey.fadeOut, {
            opacity: Fade.min,
            duration: config.fadeDuration,
            easing: Ease.linear,
        });

        ///
        this.createChild(AnimKey.loop, " > svg > circle", {
            r: config.radiusArray,
            loop: true,
            delay: anime.stagger(config.loopStagger),
            duration: config.loopIteration,
            easing: Ease.linear,
        });
    }

    ///
    public async in(): Promise<void> {
        const loop = this.get(AnimKey.loop);
        if (!loop!.isPlaying()) {
            loop!.play();
        }
        await this.run(AnimKey.fadeIn);
    }

    ///
    public out(): Promise<void> {
        return this.run(AnimKey.fadeOut);
    }
}

export function createAnimation(
    config: LoadingSpinnerConfig,
): LoadingSpinnerAnimation {
    return new LoadingSpinnerAnimation(config);
}
