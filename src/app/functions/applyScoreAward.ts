import { scaleImmediately, scaleTo } from "../../core/anime-x/scale";
import { getElementHeadings } from "../../core/xelemental/getElementHeadings";
import { ELEMENT } from "../animation/elements";
import { getStateFlow } from "../../core/state-flow/getStateFlow";
import { AppState } from "../models/AppState";
import { incrementScore } from "../animation/incrementScore";
import { fadeOut } from "../../core/anime-x/fade";
import { wait } from "../../core/anime-x/wait";
import { Xelement } from "../../core/xelemental/Xelement";

export async function applyScoreAward(award: number): Promise<void> {
    const [state] = getStateFlow<AppState>();
    const bonusValue = getElementHeadings(ELEMENT.bonusValue)[0];
    await bonusValue.runAnimation(scaleImmediately(0));
    bonusValue.opacity = 1;

    if (award > 0) {
        bonusValue.removeClass("noBonus");
        bonusValue.innerHTML = `+${award} points`;
    } else {
        bonusValue.addClass("noBonus");
        bonusValue.innerHTML = "no points";
    }

    await Promise.all([
        bonusAnimation(bonusValue),
        scoreAnimation(award, state)
    ]);
}

async function bonusAnimation(bonusValue: Xelement<HTMLHeadingElement>) {
    await bonusValue.runAnimation(scaleTo({ scale: 1.0, duration: 400 }));
    await wait(800);
    await bonusValue.runAnimation(fadeOut());
}

async function scoreAnimation(award: number, state: AppState) {
    if (award <= 0) {
        return;
    }
    await incrementScore(award, state);
    if (state.score > state.best) {
        state.best = state.score;
        localStorage.setItem("bestScore", state.best.toString());
    }
}
