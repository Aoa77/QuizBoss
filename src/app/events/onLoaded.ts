import { getAppState } from "../functions/getAppState";
import { ELEMENT } from "../constants/elements";
import { GameState } from "../models/GameState";
import { getElementDivs } from "../../core/functions/getElementDivs";
import { fadeIn, fadeOut } from "../constants/fade";
import { wait } from "../../core/xobjs/xanimation/wait";
import { LOADING, PAUSE } from "../constants/times";
import { scaleBonusEnd, scaleBonusGlitch } from "../constants/scale";

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
