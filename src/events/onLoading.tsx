import { AppContext } from "../hooks";
import { GameState } from "../enums";

///
export async function onLoading(context: AppContext) {
    const { elementsHook, stateHook } = context;
    const { state, setState } = stateHook;

    if (state.quizModule === null) {
        return;
    }

    elementsHook.clearScoreMarks();

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    elementsHook.hideQuestionHeading();
    elementsHook.hideImageSection();

    await elementsHook.showSpinner();
    while (!currentItem || !currentItem.isLoaded) {
        await elementsHook.spinnerPoll();
    }

    setState({ ...state, gameState: GameState.NEXT });
}
