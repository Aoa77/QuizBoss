import { GameState } from "../models/GameState";
import wait from "../../core/timing/wait";
import { Duration } from "../elements/fade";
import { getAppStateFlow } from "../appFlow/useAppStateFlow";
import { getXref } from "../../core/hooks/useXref";
import { ElementNames } from "../elements/ElementNames";

export default async function onLoaded() {
    const [state, setState] = getAppStateFlow();
    const [loading, image] = getXref<HTMLDivElement>(
        { id: ElementNames.loading },
        { id: ElementNames.image },
    );

    if (state.quizModule === null) {
        return;
    }

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    await elements.fadeOut(loading);
    await elements.fadeIn(image);

    while (!currentItem || !currentItem.isLoaded) {
        await wait(Duration.POLL);
    }

    setState({ ...state, gameState: GameState.NEXT });
}
