import { EASING } from "../../core/anime-x/easings";
import { scaleTo } from "../../core/anime-x/scale";
import { Xelement } from "../../core/xelemental/Xelement";
import { AppState } from "../models/AppState";

export async function incrementScore(
    award: number,
    state: AppState,
    score: Xelement<HTMLDivElement>,
) {
    if (award === 0) {
        return;
    }

    score.addClass("bonus");

    const startScale = 1;
    const endScale = 3;
    const scaleStep = (endScale - startScale) / award;

    let scale = startScale;


    for (let i = 0; i < award; i++) {
        scale += scaleStep;
        state.score += 1;
        score.innerHTML = state.score.toString();
        await score.runAnimation(scaleTo(scale, 444, EASING.easeOutQuad));
    }


    await score.runAnimation(scaleTo(1, 1500, EASING.easeInQuint));


    // create an algorithm for this..
}
