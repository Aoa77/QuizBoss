import { AnimeParams } from "animejs";
import { EASING } from "./easings";

export function scaleTo(
    scale: number,
    duration: number,
    easing: string = "easeOutElastic(1, .6)",
): AnimeParams {
    const xp: AnimeParams = {
        duration,
        easing,
        scaleX: scale,
        scaleY: scale,
    };
    return xp;
}

export function scaleImmediately(scale: number): AnimeParams {
    const xp: AnimeParams = {
        duration: 1,
        easing: EASING.linear,
        scaleX: scale,
        scaleY: scale,
    };
    return xp;
}
