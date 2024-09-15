import { AppContext } from "../app";
import { GameState } from "../state";
import { delay, $D } from "../time";

export async function onLoading(context: AppContext) {
    ///
    const { elements, states } = context;
    const { refs } = elements;
    const { image, loading } = refs;
    const { state, setState } = states;

    if (state.quizModule === null) {
        return;
    }

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    await elements.fadeOut(loading.target);
    await elements.fadeIn(image.target);

    while (!currentItem || !currentItem.isLoaded) {
        await delay({ value: $D.POLL });
    }

    setState({ ...state, gameState: GameState.NEXT });
}
