import { AnimeParams } from "animejs";
import { DURATION } from "./times";

const SCALE = {
    DURATION: DURATION.SCALE,
    UP: 1.2,
    DOWN: 1.0,
};

export const scaleUp: AnimeParams = {
    duration: SCALE.DURATION,
    scale: SCALE.UP,
    // endDelay: 100
};

export const scaleDown: AnimeParams = {
    duration: SCALE.DURATION,
    scale: SCALE.DOWN,
    // endDelay: 100
};
