import { AppSettings } from "./App.settings";
import { EventName } from "../code/EventName";
import { QuizItem } from "../code/QuizItem";
import { QuizModule } from "../code/QuizModule";
import { Timer } from "../code/Timer";

export interface AppState {
    bestScore: number;
    buttonAnswerMap: (QuizItem | null)[];
    correctAnswerButtonIndex: number;
    currentItem: QuizItem | null;
    currentItemIndex: number;
    eventName: EventName;
    guessButtonIndex: number;
    itemScore: number;
    quizModule: QuizModule | null;
    quizScore: number;
    settings: AppSettings;
    timer: Timer;
    totalItems: number;
}

export function initAppState(settings: AppSettings): AppState {
    const buttonAnswerMap: (QuizItem | null)[] = [];
    for (let i = 0; i < settings.guessButtonCount; i++) {
        buttonAnswerMap.push(null);
    }
    return {
        bestScore: 0,
        buttonAnswerMap,
        correctAnswerButtonIndex: -1,
        currentItem: null,
        currentItemIndex: -1,
        eventName: EventName.StartApp,
        guessButtonIndex: -1,
        itemScore: 0,
        quizModule: null,
        quizScore: 0,
        settings,
        timer: Timer.instance(),
        totalItems: 0,
    };
}
