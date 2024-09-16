import AppContext from "../app/AppContext";
import { GameState } from "../state/GameState";
import delay from "../time/delay";
import { Duration } from "../time/Duration";

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
        await delay(Duration.POLL);
    }

    setState({ ...state, gameState: GameState.NEXT });
}
