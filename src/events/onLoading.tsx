import AllProps from "../props/AllProps";
import { GameState } from "../props/Enums";
import { delay, hideElementRef, showElementRef } from "../utilities";

///
export async function onLoading(props: AllProps) {
    const {
        config,
        currentItemIndex, //
        elements,
        quizModule,
        setGameState,
    } = props;

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
