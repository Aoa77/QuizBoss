import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { AppSettings } from "./models/AppSettings";

const quizModuleName = "quizboss-world-flags";
const settings = new AppSettings({ quizModuleName });
createRoot(document.getElementById("root")!).render(<App {...settings} />);
