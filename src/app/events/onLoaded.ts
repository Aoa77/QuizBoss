import { ELEMENT } from "../animation/elements";
import { GameState } from "../models/GameState";
import { wait } from "../../core/anime-x/wait";
import { LOADING, PAUSE } from "../animation/times";
import { getAppState } from "../hooks/useAppState";
import { fadeOut, fadeIn } from "../../core/anime-x/fade";
import { getElementDivs } from "../../core/xelemental/getElementDivs";
import { scaleBonusGlitch, scaleBonusEnd } from "../animation/scaleBonus";

export async function onLoaded() {
    const [state, setState] = getAppState();
    const [loading, image, score] = getElementDivs(
        ELEMENT.loading,
        ELEMENT.image,
        ELEMENT.scoreValue,
    );

    if (state.quizModule === null) {
        return;
    }
    await wait(PAUSE.NORMAL);

    if (state.award > 0) {
        await score.runAnimation(scaleBonusGlitch());
        score.removeClass("bonus");
        score.startAnimation(scaleBonusEnd());
    }

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    while (!currentItem || !currentItem.isLoaded) {
        await wait(LOADING.POLL);
    }

    await Promise.all([
        loading.runAnimation(fadeOut()),
        image.runAnimation(fadeIn()),
    ]);

    setState({ ...state, gameState: GameState.NEXT });
}
