import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { AppSettings } from "./app/App.settings";
import { ThemeVars } from "./libs/theme-vars/ThemeVars";
import { ThemeName, TV } from "./models/Theme";
import { showErrorUI } from "./main.errors";

//////////////////////////////////////////////////
const quizModuleName = "quizboss-world-flags";
const errorHandler = showErrorUI;
//////////////////////////////////////////////////

const root: HTMLElement | null = document.getElementById("root");
try {
    const settings = new AppSettings({
        quizModuleName,
        enableSecretQuestionSkip: false,
        enableSecretWindowReload: false,
        maxQuestions: 0,
        preloadImageCount: 25,
        oneTickAtSpeed: 750,
        errorHandler,
    });
    await ThemeVars.config(ThemeName, TV, "themes");
    await ThemeVars.apply(settings.theme);
    createRoot(root!).render(<App {...settings} />);
} catch (error) {
    errorHandler(error);
}
