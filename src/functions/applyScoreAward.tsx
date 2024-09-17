import ElementController from "../elements/ElementController";
import State from "../state/State";


export default async function applyScoreAward(
    award: number,
    state: State,
    elements: ElementController
): Promise<void> {
    //
    if (award === 0) {
        return;
    }
    state.score = await elements.applyScoreAward(state.score, award);
    if (state.score > state.best) {
        state.best = state.score;
        localStorage.setItem("bestScore", state.best.toString());
    }
}
