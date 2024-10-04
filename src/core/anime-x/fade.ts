import { AnimeParams } from "animejs";
import { AnimationDefaultSettings, AnimationGlobalSettings } from "./config";

export function fadeIn(p?: FadeParams): AnimeParams {
    p ??= {};
    return fadeTo({ ...p, opacity: AnimationGlobalSettings.config.maxOpacity });
}

export function fadeOut(p?: FadeParams): AnimeParams {
    p ??= {};
    return fadeTo({ ...p, opacity: AnimationGlobalSettings.config.minOpacity });
}

export function fadeTo(p: FadeToParams): AnimeParams {
    const params: AnimeParams = {
        duration: p.duration ?? AnimationDefaultSettings.config.fadeDuration,
        easing: p.easing ?? AnimationDefaultSettings.config.fadeEasing,
        opacity: p.opacity,
    };
    return params;
}

export interface FadeParams {
    duration?: number;
    easing?: string;
}

export interface FadeToParams extends FadeParams {
    opacity: number;
}
