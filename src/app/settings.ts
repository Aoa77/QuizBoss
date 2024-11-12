import { DemoMode } from "../code/DemoMode";
import { ThemeName } from "../code/Theme";
import { $time } from "../libs/anime-context/AnimeConstants";
import { showErrorUI } from "./errors";

export const SETTINGS: AppSettings = {
    quizModuleName: "quizboss-world-flags",
    errorHandler: showErrorUI,
    strictMode: false,

    demoMode: DemoMode.RIGHT,
    demoDelayMin: 0,
    demoDelayMax: 0,

    theme: ThemeName.dark,
    guessButtonCount: 4,
    maxQuestions: 10,

    tickMilliseconds: $time.setTickMilliseconds(888),
    timerSeconds: 10,
};

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
    tickMilliseconds: number;
    timerSeconds: number;
}
