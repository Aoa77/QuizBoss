import { XrefBase } from "../../core/elements/xref";
import { SCALE } from "./constants";
import { AnimeParams } from "animejs";

export function scaleUp(xref: XrefBase): AnimeParams {
    return {
        targets: xref.idSelector,
        duration: SCALE.DURATION,
        scale: SCALE.UP,
    };
}

export function scaleDown(xref: XrefBase): AnimeParams {
    return {
        targets: xref.idSelector,
        duration: SCALE.DURATION,
        scale: SCALE.DOWN,
    };
}
