import { AnimeParams } from "animejs";
import { BaseParams, FadeParams } from "./params";
import {  OPACITY } from "./constants";

export function fadeIn(p: BaseParams): AnimeParams {
    return fadeTo({ ...p, opacity: OPACITY.MAX });
}

export function fadeOut(p: BaseParams): AnimeParams {
    return fadeTo({ ...p, opacity: OPACITY.MIN });
}

export function fadeTo(p: FadeParams): AnimeParams {
    const params: AnimeParams = {
        duration: p.duration,
      //  easing: p.easing ?? EASING.linear,
        opacity: p.opacity,
    };
    return params;
}

export function fadeImmediately(opacity: number): AnimeParams {
    return fadeTo({ duration: 0,  opacity });
}
