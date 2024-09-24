import { useAnimationFactory } from "../../core/animation/useAnimationFactory";
import { ANIMATION } from "./ANIMATION";
import { fadeIn, fadeOut } from "./fade";
import { scaleDown, scaleUp } from "./scale";
import { waitTimes } from "./waitTimes";

export function useAnimation(speedMultiplier: number) {
    useAnimationFactory({
        speedMultiplier,
        animationBuilders: [
            {
                name: ANIMATION.FADE_IN,
                build: fadeIn,
            },
            {
                name: ANIMATION.FADE_OUT,
                build: fadeOut,
            },
            {
                name: ANIMATION.SCALE_UP,
                build: scaleUp,
            },
            {
                name: ANIMATION.SCALE_DOWN,
                build: scaleDown,
            },
        ],
        waitTimes,
    });
}


