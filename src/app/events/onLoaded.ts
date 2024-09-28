import { getAppState } from "../functions/getAppState";
import { ELEMENT } from "../constants/elements";
import { GameState } from "../models/GameState";
import { getElementDivs } from "../../core/functions/getElementDivs";
import { fadeIn, fadeOut } from "../constants/fade";
import { wait } from "../../core/xobjs/Xanimation";
import { LOADING } from "../constants/times";

export async function onLoaded() {
    const [state, setState] = getAppState();
    const [loading, image] = getElementDivs(ELEMENT.loading, ELEMENT.image);

    if (state.quizModule === null) {
        return;
    }

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];


    await loading.runAnimation(fadeOut());
    await image.runAnimation(fadeIn());

    while (!currentItem || !currentItem.isLoaded) {
        await wait(LOADING.POLL);
    }
    setState({ ...state, gameState: GameState.NEXT });
}
