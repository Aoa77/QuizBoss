import { AnimParams, ComponentAnimation } from "../app/App.base";
import { Duration, Ease, Fade } from "../libs/anime+/Constants";
import { GuessButtonsConfig } from "./GuessButtons.config";

enum AnimKey {
    fadeIn = "fadeIn",
    fadeOut = "fadeOut",
    validGuess = "validGuess",
}

export class GuessButtonsAnimation extends ComponentAnimation<
    GuessButtonsConfig,
    AnimKey
> {
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

        this.define(AnimKey.validGuess, {
            scale: [1, 1.2, 1],
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

    ///
    public async validGuess(params: AnimParams): Promise<void> {
        const anim = this.build(AnimKey.validGuess, params.enable, params);
        if (anim) {
            await anim.run();
        }
    }
}

export function createAnimation(config: GuessButtonsConfig): GuessButtonsAnimation {
    return new GuessButtonsAnimation(config);
}
