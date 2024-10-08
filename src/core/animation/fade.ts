import { AnimeParams } from "animejs";
import { AnimationDefaultSettings, AnimationGlobalSettings } from "./config";
import { BaseParams, FadeParams } from "./params";

export function fadeIn(p?: BaseParams): AnimeParams {
    p ??= {};
    return fadeTo({ ...p, opacity: AnimationGlobalSettings.config.maxOpacity });
}

export function fadeOut(p?: BaseParams): AnimeParams {
    p ??= {};
    return fadeTo({ ...p, opacity: AnimationGlobalSettings.config.minOpacity });
}

export function fadeTo(p: FadeParams): AnimeParams {
    const params: AnimeParams = {
        duration: p.duration ?? AnimationDefaultSettings.config.fadeDuration,
        easing: p.easing ?? AnimationDefaultSettings.config.fadeEasing,
        opacity: p.opacity,
    };
    if (p.delay) {
        params.delay = p.delay;
    }
    if (p.endDelay) {
        params.endDelay = p.endDelay;
    }
    return params;
}


