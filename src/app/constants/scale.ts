import { AnimeParams } from "animejs";
import { DURATION } from "./times";

const SCALE = {
    DURATION: DURATION.SCALE,
    UP: 1.2,
    DOWN: 1.0,
};

export function scaleUp(scale: number = SCALE.UP): AnimeParams {
    return {
        duration: SCALE.DURATION,
        scale,
    };
}

export function scaleDown(scale: number = SCALE.DOWN): AnimeParams {
    return {
        duration: SCALE.DURATION,
        scale,
    };
}
