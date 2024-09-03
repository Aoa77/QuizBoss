import { AppProps, clearScoreMarks, hideElementRef } from "../props";
import { GameState } from "../enums";

///
export async function onLoading(props: AppProps) {
    const { delay, elements, state, setState } = props;

    if (state.quizModule === null) {
        return;
    }

    clearScoreMarks(elements);

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    hideElementRef(elements.questionHeading);
    hideElementRef(elements.imageSection);

    await delay.showSpinner();
    while (!currentItem || !currentItem.isLoaded) {
        await delay.spinnerPoll();
    }

    setState({ ...state, gameState: GameState.NEXT });
}
