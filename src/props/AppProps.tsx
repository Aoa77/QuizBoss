import { ButtonElement, Elements } from "./Elements";
import { Config } from "./Config";
import { GameState } from "../enums/GameState";
import { QuizModule } from "./QuizModule";
import Delay from "./Delay";

export default interface AppProps {
    config: Config;
    currentItemIndex: number;
    delay: Delay;
    elements: Elements;
    gameState: GameState;
    guessButtons: ButtonElement[];
    guessValue: string;
    quizModule: QuizModule | null;
    score: number;
    best: number;
    setCurrentItemIndex: (value: number) => void;
    setGameState: (value: GameState) => void;
    setGuessValue: (value: string) => void;
    setQuizModule: (value: QuizModule) => void;
    setScore: (value: number) => void;
    setBest: (value: number) => void;
}

