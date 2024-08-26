import { AppProps } from "../props";
import { GameState } from "../enums";
import { hideElementRef, showElementRef } from "../utilities/visibility";

///
export async function onLoading(props: AppProps) {
    const {
        config,
        currentItemIndex, //
        delay,
        elements,
        quizModule,
        setGameState,
    } = props;

    if (quizModule === null) {
        return;
    }

    const quizItems = quizModule.quizData.items;
    const currentItem = quizItems[currentItemIndex];
    const spinner = elements.loadingSection.current!.children[0];

    hideElementRef(elements.questionHeading);
    await delay.loadingExtended();
    
    hideElementRef(elements.imageSection);
    if (config.spinnerReset) {
        spinner.className = "";
    }
    showElementRef(elements.loadingSection);
    spinner.className = "spinner";
    
    while (!currentItem || !currentItem.isLoaded) {
        await delay.spinnerPoll();
    }
    
    setGameState(GameState.NEXT);
}
