import { AnimeParams } from "animejs";
import { applyPercentage, applyTimePercentage } from "../../core/functions/applyPercentage";

const SCALE = {
    BASE: 1.0,
    BUTTON: 1.3,
    DURATION: 800,
    SCORE: 1.8,
    SPEED: 100,
};

export function scaleBase(
    speed: number = SCALE.SPEED,
    scale: number = 100,
): AnimeParams {
    return {
        duration: applyTimePercentage(SCALE.DURATION, speed),
        scale: applyTimePercentage(SCALE.BASE, scale),
    };
}

export function scaleButton(
    speed: number = SCALE.SPEED,
    scale: number = 100,
): AnimeParams {
    return {
        duration: applyTimePercentage(SCALE.DURATION, speed),
        scale: applyTimePercentage(SCALE.BUTTON, scale),
    };
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
