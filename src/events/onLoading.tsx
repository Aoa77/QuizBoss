import { AppContext } from "../context";
import { GameState } from "../enums";

///
export async function onLoading(context: AppContext) {
    const { elementContext, stateContext, timeContext } = context;
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
        await timeContext.spinnerPoll();
    }

    setState({ ...state, gameState: GameState.NEXT });
}
