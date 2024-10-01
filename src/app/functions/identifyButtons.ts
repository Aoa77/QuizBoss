import { getAppState } from "../hooks/state-hooks";
import { getElementButtons } from "../../core/xelemental/getElementButtons";
import { Xelement } from "../../core/xelemental/Xelement";


export function identifyButtons(): IdentifyButtonsResult {
    const [state] = getAppState();
    const { answerSpot } = state;
    const all = getElementButtons();
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


