import { AppContext } from "../app";
import { GameState } from "../state";
import { delay, Duration } from "../time";

///
export async function onReady(context: AppContext) {
    const { elements, states } = context;
    const { refs } = elements;
    const { title } = refs;
    const { state, setState } = states;

    await elements.fadeIn(title.target);
    await delay(Duration.WAIT, 3);

    setState({ ...state, gameState: GameState.LOADING });
    return;
}
