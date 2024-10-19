import { AnimeParams } from "animejs";
import { ScaleParams } from "./params";

export function scaleTo(p: ScaleParams): AnimeParams {
    const params: AnimeParams = {
        duration: p.duration,
        scale: p.scale,
    };
    if (p.easing) {
        params.easing = p.easing;
    }
    return params;
}

export function scaleImmediately(scale: number): AnimeParams {
    return scaleTo({ duration: 0, scale });
}


