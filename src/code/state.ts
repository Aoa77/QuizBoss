import { QuizItem, QuizModule } from "./data";
import { EventName } from "./game";

export interface AppState {
    ///
    appTitle: string;
    appVersion: string;
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
    totalItems: number;
}

export function initAppState(params: { guessButtonCount: number }): AppState {
    const buttonAnswerMap: (QuizItem | null)[] = [];
    for (let i = 0; i < params.guessButtonCount; i++) {
        buttonAnswerMap.push(null);
    }
    return {
        appTitle: "QuizBoss",
        appVersion: "",
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
        totalItems: 0,
    };
}