import { AnimeParams } from "animejs";
import { DURATION } from "./waitTimes";
import { Xref } from "../../core/xobjs/Xref";

const SCALE = {
    DURATION: DURATION.SCALE,
    UP: 1.2,
    DOWN: 1.0,
};

export function scaleUp(xref: Xref): AnimeParams {
    return {
        targets: xref.idSelector,
        duration: SCALE.DURATION,
        scale: SCALE.UP,
        endDelay: 100
    };
}

export function scaleDown(xref: Xref): AnimeParams {
    return {
        targets: xref.idSelector,
        duration: SCALE.DURATION,
        scale: SCALE.DOWN,
        endDelay: 100
    };
}
