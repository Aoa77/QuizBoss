import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { AppSettings } from "./models/AppSettings";
import { Theme } from "./context/Theme";

const quizModuleName = "quizboss-world-flags";
const settings = new AppSettings({ quizModuleName });

Theme.config("./themes");
await Theme.apply(settings.theme);

const root = document.getElementById("root");
createRoot(root!).render(<App {...settings} />);
