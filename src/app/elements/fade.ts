import { AnimeParams } from "animejs";
import { DURATION } from "./waitTimes";
import { Xref } from "../../core/xobjs/Xref";

const FADE = {
    EASING: "linear",
    DURATION: DURATION.FADE,
    IN: 1,
    OUT: 0,
};

export function fadeIn(xref: Xref): AnimeParams {
    return {
        targets: xref.idSelector,
        duration: FADE.DURATION,
        easing: FADE.EASING,
        opacity: FADE.IN,
    };
}

export function fadeOut(xref: Xref): AnimeParams {
    return {
        targets: xref.idSelector,
        duration: FADE.DURATION,
        easing: FADE.EASING,
        opacity: FADE.OUT,
    };
}
