import { AnimeParams }  from "animejs";
import { FADE }         from "./constants";
import { XrefBase }     from "../../core/elements/xref";

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
