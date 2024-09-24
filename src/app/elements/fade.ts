import { AnimeParams } from "animejs";
import { XrefBase } from "../../core/elements/xref";

const FADE = {
    EASING: "linear",
    DURATION: 500,
    IN: 1,
    OUT: 0,
};

export function fadeIn(xref: XrefBase): AnimeParams {
    return {
        targets: xref.idSelector,
        duration: FADE.DURATION,
        easing: FADE.EASING,
        opacity: FADE.IN,
    };
}

export function fadeOut(xref: XrefBase): AnimeParams {
    return {
        targets: xref.idSelector,
        duration: FADE.DURATION,
        easing: FADE.EASING,
        opacity: FADE.OUT,
    };
}
