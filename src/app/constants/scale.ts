import { AnimeParams } from "animejs";
import {
    applyPercentage,
    applyTimePercentage,
} from "../../core/functions/applyPercentage";
import { EASING } from "../../core/xobjs/xanimation/EASING";

const SCALE = {
    BASE: 1.0,
    BUTTON: 1.3,
    DURATION: 800,
    SCORE: 1.8,
    SPEED: 100,
};

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

export function scaleImmediatelyTo(scale: number): AnimeParams {
    const xp: AnimeParams = {
        duration: 1,
        easing: EASING.LINEAR,
        scale,
    };
    return xp;
}

export function scaleZero(
    speed: number = SCALE.SPEED,
    easing: string | null = null,
): AnimeParams {
    const xp: AnimeParams = {
        duration: applyTimePercentage(SCALE.DURATION, speed),
        scale: 0,
    };
    if (easing) {
        xp.easing = easing;
    }
    return xp;
}

export function scaleBase(
    speed: number = SCALE.SPEED,
    easing: string | null = null,
): AnimeParams {
    const xp: AnimeParams = {
        duration: applyTimePercentage(SCALE.DURATION, speed),
        scale: applyPercentage(SCALE.BASE, 100),
    };
    if (easing) {
        xp.easing = easing;
    }
    return xp;
}

export function scaleButton(
    speed: number = SCALE.SPEED,
    scale: number = 100,
    easing: string | null = null,
): AnimeParams {
    const xp: AnimeParams = {
        duration: applyTimePercentage(SCALE.DURATION, speed),
        scale: applyPercentage(SCALE.BUTTON, scale),
    };
    if (easing) {
        xp.easing = easing;
    }
    return xp;
}

export function scaleScore(
    speed: number = SCALE.SPEED,
    scale: number = 100,
    easing: string | null = null,
): AnimeParams {
    const xp: AnimeParams = {
        duration: applyTimePercentage(SCALE.DURATION, speed),
        scale: applyPercentage(SCALE.SCORE, scale),
    };
    if (easing) {
        xp.easing = easing;
    }
    return xp;
}
