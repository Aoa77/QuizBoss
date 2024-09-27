import { getElementDivs } from "../../core/functions/getElementDivs";
import { wait } from "../../core/functions/wait";
import { Xelement } from "../../core/xobjs/Xelement";
import { ELEMENT } from "../constants/elements";
import { scaleDown, scaleUp } from "../constants/scale";
import { DELAY, DURATION } from "../constants/times";
import { AppState } from "../models/AppState";
import { getAppState } from "./getAppState";

export async function applyScoreAward(award: number): Promise<void> {
    //
    if (award === 0) {
        return;
    }
    const [state] = getAppState();
    const score = getElementDivs(ELEMENT.scoreValue)[0];

    await wait(DELAY.PRE_REVEAL, 0.45);
    await score.runAnimation(scaleUp(1.75), { localSpeed: 1.25 });
    await incrementScore(award, state, score);
    await score.runAnimation(scaleDown());

    if (state.score > state.best) {
        state.best = state.score;
        localStorage.setItem("bestScore", state.best.toString());
    }
}
async function incrementScore(
    award: number,
    state: AppState,
    score: Xelement<HTMLDivElement>,
) {
    for (let i = 0; i < award; i++) {
        ++state.score;
        score.innerHTML = state.score.toString();
        await wait(DURATION.FADE, 1.5);
    }
}
