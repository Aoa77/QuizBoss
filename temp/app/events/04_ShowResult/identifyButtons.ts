import { Xelement } from "../../../core/animation/dom/Xelement";


export function identifyButtons(): IdentifyButtonsResult | null {
    return null;
}


export interface IdentifyButtonsResult {
    all: Xelement<HTMLButtonElement>[];
    answerSpot: number;
    correct: Xelement<HTMLButtonElement>;
    top: Xelement<HTMLButtonElement>;
    wrong: Xelement<HTMLButtonElement>[];
}


