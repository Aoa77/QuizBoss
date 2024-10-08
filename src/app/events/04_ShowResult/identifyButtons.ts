import { flow } from "../../../core/context/flow";
import { QuizState } from "../../models/QuizState";
import { Xelement } from "../../../core/animation/dom/Xelement";
import { xref } from "../../../core/animation/dom/xref";


export function identifyButtons(): IdentifyButtonsResult {
    const [state] = flow<QuizState>();
    const { answerSpot } = state;
    const all = xref.buttons();
    const correct = all[answerSpot];
    const top = all[0];
    const wrong = all.filter((x) => x.id !== correct.id);
    return { all, answerSpot, correct, top, wrong };
}


export interface IdentifyButtonsResult {
    all: Xelement<HTMLButtonElement>[];
    answerSpot: number;
    correct: Xelement<HTMLButtonElement>;
    top: Xelement<HTMLButtonElement>;
    wrong: Xelement<HTMLButtonElement>[];
}


