import { AppSettings } from "../app/App.settings";
import { EventName } from "./EventName";
import { QuizItem } from "./QuizItem";
import { QuizModule } from "./QuizModule";

export interface QuizState {
    answerSpot: number;
    bestScore: number;
    currentItemIndex: number;
    eventName: EventName;
    guessValue: string;
    quizModule: QuizModule | null;
    settings: AppSettings;
    score: number;
    totalItems: number;
}

export function currentQuizItem(state: QuizState): QuizItem | null {
    if (!state.quizModule) {
        return null;
    }
    return state.quizModule.quizData.items[state.currentItemIndex];
}

export function initQuizState(settings: AppSettings): QuizState {
    return {
        answerSpot: 0,
        bestScore: 0,
        currentItemIndex: 0,
        eventName: EventName.AppStart,
        guessValue: "",
        quizModule: null,
        settings,
        score: 0,
        totalItems: 0,
    };
}
