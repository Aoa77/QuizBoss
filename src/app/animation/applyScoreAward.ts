import { scaleImmediately, scaleTo } from "../../core/animation/scale";
import { ELEMENT } from "./elements";
import { flow } from "../../core/context/flow";
import { QuizState } from "../models/QuizState";
// import { incrementScore } from "./incrementScore";
import { fadeOut } from "../../core/animation/fade";
import { wait } from "../../core/animation/wait";
import { Xelement } from "../../core/animation/dom/Xelement";
import { xref } from "../../core/animation/dom/xref";

export async function applyScoreAward(award: number): Promise<void> {
    const [state] = flow<QuizState>();
    const bonusValue = xref.headings(ELEMENT.bonusValue)[0];
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

async function scoreAnimation(award: number, state: QuizState) {
    if (award <= 0) {
        return;
    }
   // await incrementScore(award, state);
    if (state.score > state.best) {
        state.best = state.score;
        localStorage.setItem("bestScore", state.best.toString());
    }
}
