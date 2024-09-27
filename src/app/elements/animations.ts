import { driftUp } from "./driftUp";
import { fadeIn, fadeOut } from "./fade";
import { scaleUp, scaleDown } from "./scale";

export const ANIMATION = {
    FADE_IN: "fadeIn",
    FADE_OUT: "fadeOut",
    SCALE_UP: "scaleUp",
    SCALE_DOWN: "scaleDown",
    DRIFT_UP: "driftUp",
};


export const animations = [
    {
        name: ANIMATION.FADE_IN,
        build: fadeIn,
    },
    {
        name: ANIMATION.FADE_OUT,
        build: fadeOut,
    },
    {
        name: ANIMATION.SCALE_UP,
        build: scaleUp,
    },
    {
        name: ANIMATION.SCALE_DOWN,
        build: scaleDown,
    },
    {
        name: ANIMATION.DRIFT_UP,
        build: driftUp,
    }
];



