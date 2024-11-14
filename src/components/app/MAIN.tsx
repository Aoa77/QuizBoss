import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { SETTINGS } from "../../core/settings";
import { ThemeName, TV } from "../../core/themes";
import { ThemeVars } from "../../libs/theme-vars/ThemeVars";

/////////////////////////////////////////////////////////////
const root: HTMLElement = document.getElementById("root")!;
/////////////////////////////////////////////////////////////

try {
    await ThemeVars.config(ThemeName, TV, "themes");
    ThemeVars.apply(SETTINGS.theme);
    if (SETTINGS.strictMode) {
        console.warn("== STRICT MODE ENABLED ==");
        createRoot(root).render(
            <StrictMode>
                <App {...SETTINGS} />
            </StrictMode>,
        );
    } else {
        createRoot(root).render(<App {...SETTINGS} />);
    }
} catch (error) {
    SETTINGS.errorHandler!(error);
}


