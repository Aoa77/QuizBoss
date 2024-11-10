import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { AppSettings } from "./app/App.settings";
import { ThemeVars } from "./libs/theme-vars/ThemeVars";
import { ThemeName, TV } from "./code/Theme";
import { showErrorUI } from "./main.errors";
import { DemoMode } from "./code/DemoMode";

//////////////////////////////////////////////////
const quizModuleName = "quizboss-world-flags";
const errorHandler = showErrorUI;
//////////////////////////////////////////////////

const root: HTMLElement | null = document.getElementById("root");
try {
    const settings: AppSettings = {
        quizModuleName,
        errorHandler,
        demoDelayMax: 5000,
        demoDelayMin: 2000,
        demoMode: DemoMode.RANDOM,
        guessButtonCount: 4,
        maxQuestions: 42,
        preloadImageCount: 21,
        theme: ThemeName.dark,
        timerSeconds: 10,
    };
    await ThemeVars.config(ThemeName, TV, "themes");
    await ThemeVars.apply(settings.theme);
    createRoot(root!).render(<App {...settings} />);
} catch (error) {
    errorHandler(error);
}
