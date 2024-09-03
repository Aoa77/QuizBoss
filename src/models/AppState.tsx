import { GameState } from "../enums";
import { QuizModule } from "./QuizModule";


export default interface AppState {
    currentItemIndex: number;
    gameState: GameState;
    guessValue: string;
    quizModule: QuizModule | null;
    score: number;
    best: number;
}
