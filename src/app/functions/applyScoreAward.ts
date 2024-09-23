import { getAppStateFlow } from "../appFlow/useFlow";

export default async function applyScoreAward(award: number): Promise<void> {
    //
    const [state] = getAppStateFlow();
    if (award === 0) {
        return;
    }
    // state.score = await elements.applyScoreAward(state.score, award);
    if (state.score > state.best) {
        state.best = state.score;
        localStorage.setItem("bestScore", state.best.toString());
    }
}
