import { AnimeParams } from "animejs";
import { wait } from "../../core/anime-x/wait";
import { PAUSE } from "./times";
import { Xref } from "../../core/xelemental/Xref";
import { scaleTo, scaleImmediately } from "../../core/anime-x/scale";

////
export async function scaleButton(xref: Xref): Promise<void> {
    await xref.runAnimation(scaleButtonBegin());
    await wait(PAUSE.BRIEF);
    await xref.runAnimation(scaleButtonGlitch());
    await xref.runAnimation(scaleButtonEnd());
}
export function scaleButtonBegin(xref: Xref): AnimeParams {
    return scaleTo({ scale: 1.3, duration: 666 });
}
export function scaleButtonGlitch(): AnimeParams {
    return scaleImmediately(1.33);
}
export function scaleButtonEnd(): AnimeParams {
    return scaleTo({ scale: 1.0, duration: 420 });
}
