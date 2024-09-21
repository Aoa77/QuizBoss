import AppSettings from "./AppSettings";
import { GameState } from "../models/GameState";
import QuizItem from "../models/QuizItem";
import QuizModule from "../models/QuizModule";

export interface AppState {
    answerSpot: number;
    best: number;
    currentItemIndex: number;
    gameState: GameState;
    guessValue: string;
    quizModule: QuizModule | null;
    settings: AppSettings;
    score: number;
    totalItems: number;
}

export function getCurrentItem(state: AppState): QuizItem | null {
    if (!state.quizModule) {
        return null;
    }
    return state.quizModule.quizData.items[state.currentItemIndex];
}

export function createInitialState(settings: AppSettings): AppState {
    return {
        answerSpot: 0,
        best: 0,
        currentItemIndex: 0,
        gameState: GameState.INIT,
        guessValue: "",
        quizModule: null,
        settings,
        score: 0,
        totalItems: 0,
    };
}
