import { AppSettings } from "../app/App.settings";
import { EventName } from "./EventName";
import { QuizItem } from "./QuizItem";
import { QuizModule } from "./QuizModule";

export interface QuizState {
    answerButtonIndex: number;
    bestScore: number;
    buttonAnswerMap: (number | null)[];
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
    return state.quizModule.quizData.items[state.currentItemIndex] ?? null;
}

export function initQuizState(settings: AppSettings): QuizState {
    const buttonAnswerMap: (number | null)[] = [];
    for (let i = 0; i < settings.guessButtonCount; i++) {
        buttonAnswerMap.push(null);
    }
    return {
        answerButtonIndex: 0,
        bestScore: 0,
        buttonAnswerMap: [],
        currentItemIndex: -1,
        eventName: EventName.AppStart,
        guessValue: "",
        quizModule: null,
        settings,
        score: 0,
        totalItems: 0,
    };
}
