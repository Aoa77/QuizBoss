import { AnimeParams } from "animejs";
import { EASING } from "../../core/xobjs/xanimation/EASING";


export function translateReset(): AnimeParams {
    return {
        duration: 1,
        easing: EASING.LINEAR,
        translateY: "0",
    };
}