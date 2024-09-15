import { AppContext, GameState } from "../app";

export async function onLoading(context: AppContext) {
    ///
    const { elements, states, time } = context;
    const { refs } = elements;
    const { image, loading } = refs;
    const { state, setState } = states;

    if (state.quizModule === null) {
        return;
    }

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    await elements.fadeOut(loading.target,{});
    await elements.fadeIn(image.target,{});

    while (!currentItem || !currentItem.isLoaded) {
        await time.poll();
    }

    setState({ ...state, gameState: GameState.NEXT });
}
