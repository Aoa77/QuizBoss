import { AnimeParams } from "animejs";
import { DURATION } from "./times";

const FADE = {
    EASING: "linear",
    DURATION: DURATION.FADE,
    IN: 1,
    OUT: 0,
};

export function fadeIn(): AnimeParams {
    return {
        duration: FADE.DURATION,
        easing: FADE.EASING,
        opacity: FADE.IN,
    };
}

export function fadeOut(): AnimeParams {
    return {
        duration: FADE.DURATION,
        easing: FADE.EASING,
        opacity: FADE.OUT,
    };
}