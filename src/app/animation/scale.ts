import { AnimeParams } from "animejs";
import { EASING, EASING_ARRAY } from "../../core/xobjs/xanimation/EASING";

let _easing = 0;
export function scaleTo(
    scale: number,
    duration: number,
    easing: string = EASING.easeOutBack,
): AnimeParams {
    // if (_easing === EASING_ARRAY.length) {
    //     _easing = 0;
    // }
    // easing = EASING_ARRAY[_easing];
    // console.info(easing);
    // _easing++;

    const xp: AnimeParams = {
        duration,
        easing,
        scaleX: scale,
        scaleY: scale,
    };
    return xp;
}

export function scaleImmediately(scale: number): AnimeParams {
    const xp: AnimeParams = {
        duration: 1,
        easing: EASING.linear,
        scaleX: scale,
        scaleY: scale,
    };
    return xp;
}

export function scaleButtonBegin(): AnimeParams {
    return scaleTo(1.3, 800);
}

export function scaleButtonEnd(): AnimeParams {
    return scaleTo(1.0, 600);
}

export function scaleBonusBegin(): AnimeParams {
    return scaleTo(1.0, 600);
}

export function scaleBonusGlitch(): AnimeParams {
    return scaleTo(2.25, 240, EASING.linear);
}

export function scaleBonusEnd(): AnimeParams {
    return scaleTo(1.0, 42);
}
