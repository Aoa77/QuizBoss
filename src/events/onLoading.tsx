import { Context } from "../context/Context";
import { GameState } from "../context/GameState";
import { delay, hideElementRef, showElementRef } from "../utilities";

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
    await delay(config.spinnerPoll);
    spinner.className = "spinner";

    await delay(config.nextDelay);
    while (!currentItem || !currentItem.isLoaded) {
        await delay(config.spinnerPoll);
    }

    await delay(config.nextDelay);
    setGameState(GameState.NEXT);
}
