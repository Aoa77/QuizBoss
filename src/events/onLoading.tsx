import { AppContext } from "../hooks";
import { GameState } from "../enums";

///
export async function onLoading(context: AppContext) {
    const { elementContext, stateContext } = context;
    const { state, setState } = stateContext;

    if (state.quizModule === null) {
        return;
    }

    elementContext.clearScoreMarks();

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    elementContext.hideQuestionHeading();
    elementContext.hideImageSection();

    await elementContext.showSpinner();
    while (!currentItem || !currentItem.isLoaded) {
        await elementContext.spinnerPoll();
    }

    setState({ ...state, gameState: GameState.NEXT });
}
