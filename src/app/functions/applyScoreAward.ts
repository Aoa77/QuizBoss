import { getElementDivs } from "../../core/functions/getElementDivs";
import { getElementHeadings } from "../../core/functions/getElementHeadings";
import { wait } from "../../core/xobjs/Xanimation";
import { Xelement } from "../../core/xobjs/Xelement";
import { ELEMENT } from "../constants/elements";
import { scaleBase, scaleScore, scaleZero } from "../constants/scale";
import { DELAY } from "../constants/times";
import { AppState } from "../models/AppState";
import { getAppState } from "./getAppState";

export async function applyScoreAward(award: number): Promise<void> {
    //
    if (award === 0) {
        return;
    }

    const [state] = getAppState();
    const scoreValue = getElementDivs(ELEMENT.scoreValue)[0];

    const bonusValue = getElementHeadings(ELEMENT.bonusValue)[0];
    await bonusValue.runAnimation(scaleZero(9999));
    bonusValue.opacity = 1;
    bonusValue.innerHTML = `+${award} points`;

    bonusValue.startAnimation(scaleBase());
    await incrementScore(award, state, scoreValue);
    
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
