import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { AppSettings } from "./app/AppSettings";
import { ThemeVars } from "./libs/theme-vars/ThemeVars";
import { ThemeName, TV } from "./models/Theme";

const quizModuleName = "quizboss-world-flags";
const settings = new AppSettings({ quizModuleName });

await ThemeVars.config(ThemeName, TV, "themes");
await ThemeVars.apply(settings.theme);

const root = document.getElementById("root");
createRoot(root!).render(<App {...settings} />);
