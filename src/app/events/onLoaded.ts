import wait from "../../core/animation/wait";
import { getXrefDivs } from "../../core/elements/divs";
import { getAppStateFlow } from "../appFlow/useFlow";
import { ANIM, ELEMENT, TIME } from "../elements/constants";
import { GameState } from "../models/GameState";

export default async function onLoaded() {
    const [state, setState] = getAppStateFlow();
    const [loading, image] = getXrefDivs(
        ELEMENT.loading,
        ELEMENT.image,
    );

    if (state.quizModule === null) {
        return;
    }

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    await loading.animate(ANIM.FADE_OUT);
    await image.animate(ANIM.FADE_IN);
    
    while (!currentItem || !currentItem.isLoaded) {
        await wait(TIME.POLL);
    }

    setState({ ...state, gameState: GameState.NEXT });
}
