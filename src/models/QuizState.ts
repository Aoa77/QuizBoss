import { AppSettings } from "../app/AppSettings";
import { EventName } from "./EventName";
import { QuizItem } from "./QuizItem";
import { QuizModule } from "./QuizModule";

export interface QuizState {
    answerSpot: number;
    best: number;
    currentItemIndex: number;
    eventName: EventName;
    eventWait: number,
    guessValue: string;
    quizModule: QuizModule | null;
    settings: AppSettings;
    score: number;
    totalItems: number;
}

export function getCurrentItem(state: QuizState): QuizItem | null {
    if (!state.quizModule) {
        return null;
    }
    return state.quizModule.quizData.items[state.currentItemIndex];
}

export function createInitialState(settings: AppSettings): QuizState {
    return {
        answerSpot: 0,
        best: 0,
        currentItemIndex: 0,
        eventName: EventName.QuizStart,
        eventWait: 0,
        guessValue: "",
        quizModule: null,
        settings,
        score: 0,
        totalItems: 0,
    };
}
