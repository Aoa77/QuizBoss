import { Context } from "../components/Context";
import { GameState } from "../components/GameState";
import { hideElementRef, showElementRef } from "../components/Elements";
import * as util from "../components/Util";

///
export async function onLoading(context: Context) {
    const {
        config,
        currentItemIndex, //
        elements,
        quizModule,
        setGameState,
    } = context;

    if (quizModule === null) {
        return;
    }

    const quizItems = quizModule.quizData.items;
    const currentItem = quizItems[currentItemIndex];
    const spinner = elements.loading.current!.children[0];

    hideElementRef(elements.image);
    if (config.spinnerReset) {
        spinner.className = "";
    }
    showElementRef(elements.loading);
    await util.delay(config.spinnerPoll);
    spinner.className = "spinner";

    await util.delay(config.nextDelay);
    while (!currentItem || !currentItem.isLoaded) {
        await util.delay(config.spinnerPoll);
    }

    await util.delay(config.nextDelay);
    setGameState(GameState.NEXT);
}
