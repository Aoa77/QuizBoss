import { DemoMode } from "../code/DemoMode";
import { ThemeName } from "../code/Theme";

export interface AppSettings {
    quizModuleName: string;
    errorHandler?: (error: unknown) => void;
    strictMode: boolean;

    demoMode: DemoMode;
    demoDelayMax: number;
    demoDelayMin: number;

    theme: ThemeName;
    guessButtonCount: number;
    maxQuestions: number;
    timerSeconds: number;
}

