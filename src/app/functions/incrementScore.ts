import { EASING } from "../../core/xobjs/xanimation/EASING";
import { Xelement } from "../../core/xobjs/Xelement";
import { scaleTo } from "../constants/scale";
import { AppState } from "../models/AppState";

export async function incrementScore(
    award: number,
    state: AppState,
    score: Xelement<HTMLDivElement>,
) {
    let scale = 0.5;
    let duration = 300;
    await score.runAnimation(scaleTo(scale, duration, EASING.LINEAR));
    score.addClass("bonus");

    duration = 500;
    for (let i = 0; i < award; i++) {
        state.score += 1;
        scale += 0.55;
        score.innerHTML = state.score.toString();
        await score.runAnimation(scaleTo(scale, duration));
    }
}
