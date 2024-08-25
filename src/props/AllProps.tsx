import { ButtonElement, Elements } from "./Elements";
import { Config } from "./Config";
import { GameState } from "./Enums";
import { QuizModule } from "./QuizModule";

export default interface AllProps {
    config: Config;
    currentItemIndex: number;
    elements: Elements;
    gameState: GameState;
    guessButtons: ButtonElement[];
    guessValue: string;
    quizModule: QuizModule | null;
    score: number;
    setCurrentItemIndex: (value: number) => void;
    setGameState: (value: GameState) => void;
    setGuessValue: (value: string) => void;
    setQuizModule: (value: QuizModule) => void;
    setScore: (value: number) => void;
}

