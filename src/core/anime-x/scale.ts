import { AnimeParams } from "animejs";
import { EASING } from "./easings";
import { getGlobalAnimationConfig } from "./config";

export function scaleTo(
    scale: number,
    duration?: number,
    easing?: string,
): AnimeParams {
    //
    const config = getGlobalAnimationConfig();
    duration = duration ?? config.scaleDuration;
    easing = easing ?? config.scaleEasing;

    const xp: AnimeParams = {
        duration,
        scaleX: scale,
        scaleY: scale,
    };
    if (easing) {
        xp.easing = easing;
    }
    return xp;
}

export function scaleImmediately(scale: number): AnimeParams {
    return scaleTo(scale, 1, EASING.linear);
}
