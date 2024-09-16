import AppContext from "../app/AppContext";
import { GameState } from "../state/GameState";
import delay from "../time/delay";
import { Duration } from "../time/Duration";
import { Multiplier } from "../time/Multiplier";

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
