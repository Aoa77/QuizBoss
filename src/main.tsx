import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { AppSettings } from "./app/App.settings";
import { ThemeVars } from "./libs/theme-vars/ThemeVars";
import { ThemeName, TV } from "./code/Theme";
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
        maxQuestions: 50,
        preloadImageCount: 15,
        errorHandler,
    });
    await ThemeVars.config(ThemeName, TV, "themes");
    await ThemeVars.apply(settings.theme);
    createRoot(root!).render(<App {...settings} />);
} catch (error) {
    errorHandler(error);
}
