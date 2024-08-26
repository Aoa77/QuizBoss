import { AppProps, clearScoreMarks, hideElementRef } from "../props";
import { GameState } from "../enums";

///
export async function onLoading(props: AppProps) {
    const {
        currentItemIndex, //
        delay,
        elements,
        quizModule,
        setGameState,
    } = props;

    if (quizModule === null) {
        return;
    }

    clearScoreMarks(elements);

    const quizItems = quizModule.quizData.items;
    const currentItem = quizItems[currentItemIndex];
    
    hideElementRef(elements.questionHeading);
    hideElementRef(elements.imageSection);

    await delay.showSpinner();
    while (!currentItem || !currentItem.isLoaded) {
        await delay.spinnerPoll();
    }
    
    setGameState(GameState.NEXT);
}


