import { QuizState } from "../../../../src/models/QuizState";

let initBestScoreComplete = false;
export function initBestScore(state: QuizState): number {
    let value = state.bestScore;

    if (initBestScoreComplete) {
        return value;
    }

    let local: string = localStorage.getItem("bestScore") ?? "";
    local = local.trim();
    if (local.length > 0) {
        value = parseInt(local);
    }

    initBestScoreComplete = true;
    return value;
}


