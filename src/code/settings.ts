import { DemoMode } from "./demo";
import { ThemeName } from "./style";
import { showErrorUI } from "../app/errors";
import { $time } from "../libs/anime-context";

export const SETTINGS: AppSettings = {
    quizModuleName: "quizboss-world-flags",
    errorHandler: showErrorUI,
    strictMode: false,

    demoMode: DemoMode.RIGHT,
    demoDelayMin: 400,
    demoDelayMax: 3600,

    theme: ThemeName.dark,
    guessButtonCount: 4,
    maxQuestions: 0,

    tickMilliseconds: $time.setTickMilliseconds(250),
    timerSeconds: 10,
};

export interface AppSettings {
    demoDelayMax: number;
    demoDelayMin: number;
    demoMode: DemoMode;
    errorHandler?: (error: unknown) => void;
    guessButtonCount: number;
    maxQuestions: number;
    quizModuleName: string;
    strictMode: boolean;
    theme: ThemeName;
    tickMilliseconds: number;
    timerSeconds: number;
}
