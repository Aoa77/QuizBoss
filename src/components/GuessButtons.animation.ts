import { AnimeParams } from "animejs";
import { ComponentAnimation } from "../app/App.base";
import { Duration, Ease, Fade } from "../libs/anime+/Constants";
import { GuessButtonsConfig } from "./GuessButtons.config";

enum AnimKey {
    fadeIn = "fadeIn",
    fadeOut = "fadeOut",
}

export class GuessButtonsAnimation extends ComponentAnimation<GuessButtonsConfig, AnimKey> {
    ///
    public constructor(config: GuessButtonsConfig) {
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

export function createAnimation(config: GuessButtonsConfig): GuessButtonsAnimation {
    return new GuessButtonsAnimation(config);
}
