import { getElementDivs } from "../../core/functions/getElementDivs";
import { getElementHeadings } from "../../core/functions/getElementHeadings";
import { ELEMENT } from "../animation/elements";
import { scaleBonusBegin, scaleImmediately } from "../animation/scale";
import { getAppState } from "../hooks/useAppState";
import { incrementScore } from "./incrementScore";

export async function applyScoreAward(award: number): Promise<void> {
    const [state] = getAppState();
    const scoreValue = getElementDivs(ELEMENT.scoreValue)[0];

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
    bonusValue.startAnimation(scaleBonusBegin());

    if (award > 0) {
        await incrementScore(award, state, scoreValue);
        if (state.score > state.best) {
            state.best = state.score;
            localStorage.setItem("bestScore", state.best.toString());
        }
    }
}
