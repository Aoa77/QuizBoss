import { AnimeParams } from "animejs";
import { wait } from "../../core/animation/wait";
import { PAUSE } from "./times";
import { Xref } from "../../core/xelemental/Xref";
import { scaleTo, scaleImmediately } from "../../core/animation/scale";

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
