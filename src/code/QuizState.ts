import { AppSettings } from "../app/App.settings";
import { EventName } from "./EventName";
import { QuizItem } from "./QuizItem";
import { QuizModule } from "./QuizModule";
import { Timer } from "./Timer";

export interface QuizState {
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

export function initQuizState(settings: AppSettings): QuizState {
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
