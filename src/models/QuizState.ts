import { AppSettings } from "../app/App.settings";
import { EventName } from "./EventName";
import { QuizItem } from "./QuizItem";
import { QuizModule } from "./QuizModule";

export interface QuizState {
    bestScore: number;
    quizScore: number;
    itemScore: number;
    itemTimer: number;
    buttonAnswerMap: (QuizItem | null)[];
    correctAnswerButtonIndex: number;
    currentItemIndex: number;
    currentItem: QuizItem | null;
    eventName: EventName;
    guessButtonIndex: number;
    quizModule: QuizModule | null;
    settings: AppSettings;
    totalItems: number;
}

export function initQuizState(settings: AppSettings): QuizState {
    const buttonAnswerMap: (QuizItem | null)[] = [];
    for (let i = 0; i < settings.guessButtonCount; i++) {
        buttonAnswerMap.push(null);
    }
    return {
        bestScore: 0,
        quizScore: 0,
        itemScore: 0,
        itemTimer: 0,
        buttonAnswerMap,
        correctAnswerButtonIndex: -1,
        currentItemIndex: -1,
        currentItem: null,
        eventName: EventName.StartApp,
        guessButtonIndex: -1,
        quizModule: null,
        settings,
        totalItems: 0,
    };
}
