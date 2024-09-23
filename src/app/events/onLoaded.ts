import wait from "../../core/timing/wait";
import { getXrefDivs } from "../../core/xrefs/divs";
import { getAppStateFlow } from "../appFlow/useAppStateFlow";
import { ElementNames, TIME } from "../elements/constants";
import { fadeIn, fadeOut } from "../elements/fade";
import { GameState } from "../models/GameState";

export default async function onLoaded() {
    const [state, setState] = getAppStateFlow();
    const [loading, image] = getXrefDivs(
        ElementNames.loading,
        ElementNames.image,
    );

    if (state.quizModule === null) {
        return;
    }

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    await fadeOut({ xref: loading! });
    await fadeIn({ xref: image! });

    while (!currentItem || !currentItem.isLoaded) {
        await wait({ duration: TIME.POLL });
    }

    setState({ ...state, gameState: GameState.NEXT });
}
