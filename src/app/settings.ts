import { DemoMode } from "../code/demo";
import { ThemeName } from "../code/style";
import { showErrorUI } from "./errors";
import { $time } from "../libs/anime-context/constants";

export const SETTINGS: AppSettings = {
    quizModuleName: "quizboss-world-flags",
    errorHandler: showErrorUI,
    strictMode: false,

    demoMode: DemoMode.OFF,
    demoDelayMin: 800,
    demoDelayMax: 990,

    theme: ThemeName.dark,
    guessButtonCount: 4,
    maxQuestions: 10,

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
