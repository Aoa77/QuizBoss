import { AppContext, GameState } from "../app";

export async function onLoading(context: AppContext) {
    const { elements, states, time } = context;
    const { state, setState } = states;

    if (state.quizModule === null) {
        return;
    }

    elements.clearScoreMarks();

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    elements.hideQuestionHeading();
    elements.hideImageSection();

    await elements.showSpinner();
    while (!currentItem || !currentItem.isLoaded) {
        await time.spinnerPoll();
    }

    setState({ ...state, gameState: GameState.NEXT });
}
