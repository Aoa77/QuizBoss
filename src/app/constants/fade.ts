import { AnimeParams } from "animejs";
import { DURATION } from "./times";

const FADE = {
    EASING: "linear",
    DURATION: DURATION.FADE,
    IN: 1,
    OUT: 0,
};

export const fadeIn: AnimeParams = {
    duration: FADE.DURATION,
    easing: FADE.EASING,
    opacity: FADE.IN,
};

export const fadeOut: AnimeParams = {
    duration: FADE.DURATION,
    easing: FADE.EASING,
    opacity: FADE.OUT,
};
