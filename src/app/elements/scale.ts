import { AnimeParams } from "animejs";
import { XrefBase }   from "../../core/elements/xref";

const SCALE = {
    DURATION: 500,
    UP: 1.2,
    DOWN: 1.0,
};

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
