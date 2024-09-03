import { ButtonElement, Elements } from "./Elements";
import { Config } from "./Config";
import { GameState } from "../enums/GameState";
import { QuizModule } from "./QuizModule";
import Delay from "./Delay";

export interface AppProps {
    config: Config;
    delay: Delay;
    elements: Elements;
    guessButtons: ButtonElement[];
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
}

export interface AppState {
    currentItemIndex: number;
    gameState: GameState;
    guessValue: string;
    quizModule: QuizModule | null;
    score: number;
    best: number;
}

