import { AppContext, GameState } from "../app";

///
export async function onReady(context: AppContext) {
    const { elements, states, time } = context;
    const { refs } = elements;
    const { title } = refs;
    const { state, setState } = states;

    await elements.fadeIn(title.target,{});
    await time.delay({ multiplier: 3 });

    setState({ ...state, gameState: GameState.LOADING });
    return;
}
