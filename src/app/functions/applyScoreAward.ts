import { getAppState } from "./getAppState";

export async function applyScoreAward(award: number): Promise<void> {
    //
    const [state] = getAppState();
    if (award === 0) {
        return;
    }
    // state.score = await elements.applyScoreAward(state.score, award);
    state.score += award;
    if (state.score > state.best) {
        state.best = state.score;
        localStorage.setItem("bestScore", state.best.toString());
    }
}
