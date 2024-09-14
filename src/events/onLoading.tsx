import { AppContext, GameState } from "../app";

export async function onLoading(context: AppContext) {
    ///
    const { elements, states, time } = context;
    const { state, setState } = states;

    if (state.quizModule === null) {
        return;
    }

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    elements.hideImage();
    elements.hideQuestion();

    await elements.animate.loading.fadeIn();
    await elements.animate.loading.sustain();
    while (!currentItem || !currentItem.isLoaded) {
        await time.poll();
    }

    setState({ ...state, gameState: GameState.NEXT });
}
