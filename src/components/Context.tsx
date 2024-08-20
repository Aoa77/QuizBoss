import { Config } from "./Config";
import { Elements } from "./Elements";
import { GameState } from "./GameState";
import { GuessButton } from "./GuessButton";
import { QuizModule } from "./QuizModule";

export interface Context {
    config: Config;
    currentItemIndex: number;
    elements: Elements;
    gameState: GameState;
    guessButtons: GuessButton[];
    guessValue: string;
    quizModule: QuizModule | null;
    setCurrentItemIndex: (value: number) => void;
    setGameState: (value: GameState) => void;
}
