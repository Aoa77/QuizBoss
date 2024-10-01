import { AnimeParams } from "animejs";
import { EASING } from "./easings";
import { applyTimePercentage } from "./percentages";

const FADE = {
    DURATION: 300,
    IN: 1,
    OUT: 0,
    SPEED: 100,
};

export function fadeIn(
    easing: string = EASING.linear,
    speed: number = FADE.SPEED,
): AnimeParams {
    return fadeTo(easing, speed, FADE.IN);
}

export function fadeOut(
    easing: string = EASING.linear,
    speed: number = FADE.SPEED,
): AnimeParams {
    return fadeTo(easing, speed, FADE.OUT);
}

export function fadeTo(
    easing: string = EASING.linear,
    speed: number = FADE.SPEED,
    opacity: number,
): AnimeParams {
    return {
        duration: applyTimePercentage(FADE.DURATION, speed),
        easing,
        opacity
    };
}