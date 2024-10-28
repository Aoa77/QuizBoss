import { ComponentAnimation } from "../app/App.base";
import { AnimParams } from "../models/AnimParams";
import { Duration, Ease, Fade } from "../libs/anime+/Constants";

enum AnimKey {
    fadeIn = "fadeIn",
    fadeOut = "fadeOut",
    buttonPress = "validGuess",
}

export function createAnimation(index: number): GuessButtonsAnimation {
    return new GuessButtonsAnimation(index);
}

export class GuessButtonsAnimation extends ComponentAnimation<AnimKey> {
    ///
    public constructor(index: number) {
        super(`GuessButton_${index}`);

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

        this.define(AnimKey.buttonPress, {
            scale: [1.3],
            duration: 2 * Duration.oneSecond,
            easing: "easeOutElastic(3, 0.40)"
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
    public async buttonPress(): Promise<void> {
        const anim = this.build(AnimKey.buttonPress, true);
        if (anim) {
            await anim.run();
        }
    }
}

