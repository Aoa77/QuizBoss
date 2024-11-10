import { DemoMode } from "../code/DemoMode";
import { ThemeName } from "../code/Theme";

export interface AppSettings {
    quizModuleName: string;
    errorHandler?: (error: unknown) => void;

    demoDelayMax: number;
    demoDelayMin: number;
    demoMode: DemoMode;
    guessButtonCount: number;
    maxQuestions: number;
    preloadImageCount: number;
    theme: ThemeName;
    timerSeconds: number;
}

