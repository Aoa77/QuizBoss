import { scaleImmediately, scaleTo } from "../../core/anime-x/scale";
import { AppState } from "../models/AppState";
import { ELEMENT } from "./elements";
import { getElementDivs } from "../../core/xelemental/getElementDivs";
import { Xelement } from "../../core/xelemental/Xelement";
import { fadeOut } from "../../core/anime-x/fade";
import { EASING } from "../../core/anime-x/easings";

let scorePlusClonesPositioned: boolean = false;

export async function incrementScore(award: number, state: AppState) {
    if (award === 0) {
        return;
    }

    const [scoreValue, scoreValue_plus1, scoreValue_plus2, scoreValue_plus3] =
        getElementDivs(
            ELEMENT.scoreValue,
            ELEMENT.scoreValue_plus1,
            ELEMENT.scoreValue_plus2,
            ELEMENT.scoreValue_plus3,
        );
    const awardScores = [scoreValue_plus1, scoreValue_plus2, scoreValue_plus3];

    if (!scorePlusClonesPositioned) {
        awardScores.forEach((scoreValue_plus) => {
            overlay(scoreValue, scoreValue_plus);
        });
        scorePlusClonesPositioned = true;
    }
    scaleScoreSequence(award, awardScores, scoreValue, state);
}

function overlay(
    scoreValue: Xelement<HTMLDivElement>,
    scoreValue_plus: Xelement<HTMLDivElement>,
) {
    const rect = scoreValue.element.getBoundingClientRect();
    scoreValue_plus.element.style.top = `${rect.top}px`;
    scoreValue_plus.element.style.left = `${rect.left}px`;
    scoreValue_plus.element.style.width = `${rect.width}px`;
    scoreValue_plus.element.style.height = `${rect.height}px`;
}

async function scaleScoreSequence(
    award: number,
    awardScores: Xelement<HTMLDivElement>[],
    scoreValue: Xelement<HTMLDivElement>,
    state: AppState,
) {
    for (let i = 0; i < award; i++) {
        state.score += 1;
        await scaleScore(awardScores[i], scoreValue, state);
    }
}

async function scaleScore(
    scorePlus: Xelement<HTMLDivElement>,
    scoreValue: Xelement<HTMLDivElement>,
    state: AppState,
): Promise<void> {
    scoreValue.innerHTML = scorePlus.innerHTML = state.score.toString();
    await scorePlus.runAnimation(scaleImmediately(1.0));
    scorePlus.opacity = 1.0;
    scoreValue.opacity = 0.0;
    scorePlus.runAnimation(
        scaleTo({ scale: 14, duration: 999, easing: EASING.linear }),
    );
    await scorePlus.runAnimation(fadeOut({ duration: 178 }));
    scoreValue.opacity = 1.0;
}
