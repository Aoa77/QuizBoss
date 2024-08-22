import { Context } from "../Context";
import { GameState } from "../GameState";
import * as util from "../Util";

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

    util.hideElement(elements.image);
    util.showElement(elements.loading);

    await util.delay(config.nextDelay);
    while (!currentItem || !currentItem.isLoaded) {
        await util.delay(config.spinnerPoll);
    }

    await util.delay(config.nextDelay);
    setGameState(GameState.NEXT);
}