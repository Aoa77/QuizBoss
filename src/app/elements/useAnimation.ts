import { useAnimationFactory } from "../../core/animation/useAnimationFactory";
import { ANIMATION }           from "./constants";
import { fadeIn, fadeOut }     from "./fade";
import { scaleDown, scaleUp }  from "./scale";

export function useAnimation(speedMultiplier: number) {
    useAnimationFactory(
        speedMultiplier,
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
    );
}
