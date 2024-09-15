import { AppContext } from "../app";
import { GameState } from "../state";
import { delay, Duration, Multiplier } from "../time";

///
export async function onReady(context: AppContext) {
    const { elements, states } = context;
    const { refs } = elements;
    const { title } = refs;
    const { state, setState } = states;

    await elements.fadeIn(title.target);
    await delay(Duration.WAIT, Multiplier.x3);

    setState({ ...state, gameState: GameState.LOADING });
    return;
}
