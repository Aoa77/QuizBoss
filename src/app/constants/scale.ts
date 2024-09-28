import { AnimeParams } from "animejs";
import { EASING } from "../../core/xobjs/xanimation/EASING";

export function scaleTo(
    scale: number,
    duration: number,
    easing: string | null = null,
): AnimeParams {
    const xp: AnimeParams = {
        duration,
        scale,
    };
    if (easing) {
        xp.easing = easing;
    }
    return xp;
}

export function scaleImmediately(scale: number): AnimeParams {
    const xp: AnimeParams = {
        duration: 1,
        easing: EASING.LINEAR,
        scale,
    };
    return xp;
}

export function scaleButtonBegin(): AnimeParams {
    return scaleTo(1.3, 800);
}

export function scaleButtonEnd(): AnimeParams {
    return scaleTo(1.0, 600);
}

export function scaleBonusBegin(): AnimeParams {
    return scaleTo(1.0, 600);
}

export function scaleBonusGlitch(): AnimeParams {
    return scaleTo(2.25, 240, EASING.LINEAR);
}

export function scaleBonusEnd(): AnimeParams {
    return scaleTo(1.0, 42);
}
