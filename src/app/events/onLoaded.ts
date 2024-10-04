import { ELEMENT } from "../animation/elements";
import { GameState } from "../models/GameState";
import { wait } from "../../core/anime-x/wait";
import { LOADING, PAUSE } from "../animation/times";
import { getStateFlow } from "../../core/state-flow/getStateFlow";
import { AppState } from "../models/AppState";
import { fadeOut, fadeIn } from "../../core/anime-x/fade";
import { getElementDivs } from "../../core/xelemental/getElementDivs";

export async function onLoaded() {
    const [state, setState] = getStateFlow<AppState>();
    const [loading, image] = getElementDivs(
        ELEMENT.loading,
        ELEMENT.image,
        ELEMENT.scoreValue,
    );

    if (state.quizModule === null) {
        return;
    }
    await wait(PAUSE.NORMAL);

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    while (!currentItem || !currentItem.isLoaded) {
        await wait(LOADING.POLL);
    }

    loading.runAnimation(fadeOut());
    image.runAnimation(fadeIn());

    setState({ ...state, gameState: GameState.NEXT });
}
