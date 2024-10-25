import anime, { AnimeParams } from "animejs";
import { Duration, Ease, Fade } from "../libs/anime+/Constants";
import { LoadingSpinnerConfig } from "./LoadingSpinner.config";
import { ComponentAnimation } from "../app/App.base";
import { AnimationTask } from "../libs/anime+/AnimationTask";

enum AnimKey {
    fadeIn = "fadeIn",
    fadeOut = "fadeOut",
    loop = "loop",
}

class LoadingSpinnerAnimation extends ComponentAnimation<
    LoadingSpinnerConfig,
    AnimKey
> {
    private _loop: AnimationTask | null = null;

    ///
    public constructor(config: LoadingSpinnerConfig) {
        ///
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

        ///
        this.defineChild(AnimKey.loop, " > svg > circle", {
            r: config.radiusArray,
            loop: true,
            delay: anime.stagger(config.loopStagger),
            duration: config.loopIteration,
            easing: Ease.linear,
        });
    }

    ///
    public async in(overrides?: AnimeParams): Promise<void> {
        if (this._loop === null) {
            this._loop = this.build(AnimKey.loop);
            this._loop.play();
        }
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
    config: LoadingSpinnerConfig,
): LoadingSpinnerAnimation {
    return new LoadingSpinnerAnimation(config);
}
