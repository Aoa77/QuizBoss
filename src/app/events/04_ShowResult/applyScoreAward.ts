import { flow } from "../../../core/context/flow";
import { QuizState } from "../../models/QuizState";
import { BonusValue } from "../../elements/BonusValue";

export async function applyScoreAward(award: number): Promise<void> {
    const [state] = flow<QuizState>();
    await BonusValue.reset();

    if (award > 0) {
        BonusValue.xref().removeClass("noBonus");
        BonusValue.xref().innerHTML = `+${award} points`;
    } else {
        BonusValue.xref().addClass("noBonus");
        BonusValue.xref().innerHTML = "no points";
    }

    await Promise.all([
        BonusValue.scaleUp(),
        scoreAnimation(award, state)
    ]);
}

async function scoreAnimation(award: number, state: QuizState) {
    if (award <= 0) {
        return;
    }
   // await incrementScore(award, state);
    if (state.score > state.best) {
        state.best = state.score;
        localStorage.setItem("bestScore", state.best.toString());
    }
}
