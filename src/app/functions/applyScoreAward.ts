import { getElementDivs } from "../../core/functions/getElementDivs";
import { wait } from "../../core/xobjs/Xanimation";
import { Xelement } from "../../core/xobjs/Xelement";
import { ELEMENT } from "../constants/elements";
import { scaleScore } from "../constants/scale";
import { DELAY } from "../constants/times";
import { AppState } from "../models/AppState";
import { getAppState } from "./getAppState";

export async function applyScoreAward(award: number): Promise<void> {
    //
    if (award === 0) {
        return;
    }
    const [state] = getAppState();
    const score = getElementDivs(ELEMENT.scoreValue)[0];

    await incrementScore(award, state, score);

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
    let speed = 60; //i % 2 === 0 ? 50 : 100;
    score.startAnimation(scaleScore());
    for (let i = 0; i < award; i++) {
        await wait(DELAY.SCORE_INCREMENT, speed);
        speed += 15;
        ++state.score;
        score.innerHTML = state.score.toString();
    }
}
