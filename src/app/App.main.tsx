import { createRoot } from "react-dom/client";
//
import { App } from "./App";
import { AppSettings } from "./App.settings";
import { showErrorUI } from "./App.errors";
//
import { DemoMode } from "../code/DemoMode";
import { ThemeName, TV } from "../code/Theme";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { StrictMode } from "react";

//////////////////////////////////////////////////
const settings: AppSettings = {
    quizModuleName:"quizboss-world-flags",
    errorHandler: showErrorUI,
    strictMode: false,
    
    demoMode: DemoMode.RIGHT,
    demoDelayMin: 0,
    demoDelayMax: 0,

    theme: ThemeName.dark,
    guessButtonCount: 4,
    maxQuestions: 10,
    timerSeconds: 10,
};
//////////////////////////////////////////////////

const root: HTMLElement = document.getElementById("root")!;
try {
    await ThemeVars.config(ThemeName, TV, "themes");
    await ThemeVars.apply(settings.theme);
    if (settings.strictMode) {
        console.warn("== STRICT MODE ENABLED ==");
        createRoot(root).render(
            <StrictMode>
                <App {...settings} />
            </StrictMode>,
        );
    } else {
        createRoot(root).render(<App {...settings} />);
    }
} catch (error) {
    settings.errorHandler!(error);
}
