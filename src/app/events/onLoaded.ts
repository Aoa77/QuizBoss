import { wait } from "../../core/functions/wait";
import { getAppState } from "../functions/getAppState";
import { TIME } from "../elements/waitTimes";
import { ELEMENT } from "../elements/ELEMENT";
import { GameState } from "../models/GameState";
import { getElementDivs } from "../../core/functions/getElementDivs";

export async function onLoaded() {
    const [state, setState] = getAppState();
    const [loading, image] = getElementDivs(ELEMENT.loading, ELEMENT.image);

    if (state.quizModule === null) {
        return;
    }

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    await loading.fadeOut();
    await image.fadeIn();

    while (!currentItem || !currentItem.isLoaded) {
        await wait(TIME.LOADING_POLL);
    }
    setState({ ...state, gameState: GameState.NEXT });
}
