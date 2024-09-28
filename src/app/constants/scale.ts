import { AnimeParams } from "animejs";
import { applySpeed } from "../../core/xobjs/Xanimation";

const SCALE = {
    BASE: 1.0,
    BUTTON: 1.2,
    DURATION: 400,
    SCORE: 1.75,
    SPEED: 100,
};

export function scaleBase(speed: number = SCALE.SPEED): AnimeParams {
    return {
        duration: applySpeed(SCALE.DURATION, speed),
        scale: SCALE.BASE,
    };
}

export function scaleButton(speed: number = SCALE.SPEED): AnimeParams {
    return {
        duration: applySpeed(SCALE.DURATION, speed),
        scale: SCALE.BUTTON,
    };
}

export function scaleScore(speed: number = SCALE.SPEED): AnimeParams {
    return {
        duration: applySpeed(SCALE.DURATION, speed),
        scale: SCALE.SCORE,
    };
}


