import { AnimeParams } from "animejs";
import { applyTimePercentage } from "../../core/functions/applyPercentage";
import { EASING } from "../../core/xobjs/xanimation/EASING";

const FADE = {
    DURATION: 300,
    IN: 1,
    OUT: 0,
    SPEED: 100,
};

export function fadeIn(speed: number = FADE.SPEED): AnimeParams {
    return {
        duration: applyTimePercentage(FADE.DURATION, speed),
        easing: EASING.linear,
        opacity: FADE.IN,
    };
}

export function fadeOut(speed: number = FADE.SPEED): AnimeParams {
    return {
        duration: applyTimePercentage(FADE.DURATION, speed),
        easing: EASING.linear,
        opacity: FADE.OUT,
    };
}
