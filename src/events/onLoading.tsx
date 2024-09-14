import { AppContext, GameState } from "../app";

export async function onLoading(context: AppContext) {
    ///
    const { elements, states, time } = context;
    const { animate } = elements;
    const { image, question, loading } = animate;
    const { state, setState } = states;

    if (state.quizModule === null) {
        return;
    }

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    await Promise.all([
        image.fadeOut(),
        question.fadeOut(),
        loading.fadeIn().then(() => loading.sustain()),
    ]);
    while (!currentItem || !currentItem.isLoaded) {
        await time.poll();
    }

    setState({ ...state, gameState: GameState.NEXT });
}
