import { AnimeParams } from "animejs";
import { SCALE }      from "./constants";
import { XrefBase }   from "../../core/elements/xref";

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
