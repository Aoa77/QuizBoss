import { useAnimationFactory } from "../../core/animation/useAnimationFactory";
import { ANIM } from "./constants";
import { fadeIn, fadeOut } from "./fade";
import { scaleDown, scaleUp } from "./scale";

export default function useAnimation(speedMultiplier: number) {
    useAnimationFactory(
        speedMultiplier,
        {
            name: ANIM.FADE_IN,
            build: fadeIn,
        },
        {
            name: ANIM.FADE_OUT,
            build: fadeOut,
        },
        {
            name: ANIM.SCALE_UP,
            build: scaleUp,
        },
        {
            name: ANIM.SCALE_DOWN,
            build: scaleDown,
        },
    );
}
