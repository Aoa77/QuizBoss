import { AnimeParams } from "animejs";
import { applySpeed } from "../../core/xobjs/Xanimation";

const FADE = {
    EASING: "linear",
    DURATION: 300,
    IN: 1,
    OUT: 0,
    SPEED: 100,
};

export function fadeIn(speed: number = FADE.SPEED): AnimeParams {
    return {
        duration: applySpeed(FADE.DURATION, speed),
        easing: FADE.EASING,
        opacity: FADE.IN,
    };
}

export function fadeOut(speed: number = FADE.SPEED): AnimeParams {
    return {
        duration: applySpeed(FADE.DURATION, speed),
        easing: FADE.EASING,
        opacity: FADE.OUT,
    };
}
