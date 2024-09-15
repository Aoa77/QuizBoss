import { GameState } from "./GameState";
import QuizModule from "./QuizModule";

export default interface State {
    answerSpot: number;
    currentItemIndex: number;
    gameState: GameState;
    guessValue: string;
    quizModule: QuizModule | null;
    score: number;
    best: number;
}
