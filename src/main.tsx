import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { AppSettings } from "./app/AppSettings";
import { ThemeVars } from "./libs/theme-vars/ThemeVars";

const quizModuleName = "quizboss-world-flags";
const settings = new AppSettings({ quizModuleName });

ThemeVars.config("./themes");
await ThemeVars.apply(settings.theme);

const root = document.getElementById("root");
createRoot(root!).render(<App {...settings} />);
