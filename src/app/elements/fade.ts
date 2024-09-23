import { AnimeParams } from "animejs";
import { XrefBase } from "../../core/elements/xref";
import { FADE } from "./constants";

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
