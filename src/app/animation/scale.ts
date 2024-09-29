import { AnimeParams } from "animejs";
import { EASING, EASING_ARRAY } from "../../core/xobjs/xanimation/EASING";
import { Xref } from "../../core/xobjs/Xref";
import { PAUSE } from "./times";
import { wait } from "../../core/xobjs/xanimation/wait";

export function scaleTo(
    scale: number,
    duration: number,
    easing: string = "easeOutElastic(1, .6)",
): AnimeParams {
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

////
export async function scaleButton(xref: Xref): Promise<void> {
    await xref.runAnimation(scaleButtonBegin());
    await wait(PAUSE.BRIEF);
    await xref.runAnimation(scaleButtonGlitch());
    await xref.runAnimation(scaleButtonEnd());
}
function scaleButtonBegin(): AnimeParams {
    return scaleTo(1.3, 800);
}
function scaleButtonGlitch(): AnimeParams {
    return scaleImmediately(1.33);
}
function scaleButtonEnd(): AnimeParams {
    return scaleTo(1.0, 600);
}

///
export function scaleBonusBegin(): AnimeParams {
    return scaleTo(1.0, 600);
}
export function scaleBonusGlitch(): AnimeParams {
    return scaleTo(2.25, 240, EASING.linear);
}
export function scaleBonusEnd(): AnimeParams {
    return scaleTo(1.0, 42);
}
