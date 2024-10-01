import { AnimeParams } from "animejs";
import { EASING } from "../../core/animation/easings";
import { scaleTo } from "../../core/animation/scale";

///
export function scaleBonusBegin(): AnimeParams {
    return scaleTo(1.0, 600);
}
export function scaleBonusGlitch(): AnimeParams {
    return scaleTo(2.25, 240, EASING.linear);
}
export function scaleBonusEnd(): AnimeParams {
    return scaleTo(1.0, 42);
}
