import { EASING } from "../../core/anime-x/easings";
import { scaleTo } from "../../core/anime-x/scale";
import { Xelement } from "../../core/xelemental/Xelement";
import { AppState } from "../models/AppState";

export async function incrementScore(
    award: number,
    state: AppState,
    score: Xelement<HTMLDivElement>,
) {
    let scale = 0.5;
    let duration = 300;
    await score.runAnimation(scaleTo(scale, duration, EASING.linear));
    score.addClass("bonus");

    duration = 500;
    for (let i = 0; i < award; i++) {
        state.score += 1;
        scale += 0.55;
        score.innerHTML = state.score.toString();
        await score.runAnimation(scaleTo(scale, duration));
    }
}
