import { AppContext, GameState } from "../app";

export async function onLoading(context: AppContext) {
    const { elements: elementController, states: stateController, time: timeController } = context;
    const { state, setState } = stateController;

    if (state.quizModule === null) {
        return;
    }

    elementController.clearScoreMarks();

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    elementController.hideQuestionHeading();
    elementController.hideImageSection();

    await elementController.showSpinner();
    while (!currentItem || !currentItem.isLoaded) {
        await timeController.spinnerPoll();
    }

    setState({ ...state, gameState: GameState.NEXT });
}
