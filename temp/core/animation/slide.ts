import { AnimeParams } from "animejs";
import { SlideParams } from "./params";
import { EASING } from "./constants";

export function slideTo(p: SlideParams): AnimeParams {
    const params: AnimeParams = {
        duration: p.duration,
        translateX: p.x,
        translateY: p.y,
    };
    if (p.easing) {
        params.easing = p.easing;
    }
    return params;
}

export function slideReset(): AnimeParams {
    return { duration: 0, easing: EASING.linear, translateX: 0, translateY: 0 };
}
