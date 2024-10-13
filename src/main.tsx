import { createRoot } from "react-dom/client";
import { App } from "./app/components/App";
import { AppSettings } from "./app/models/AppSettings";

const quizModuleName = "quizboss-world-flags";
const settings = new AppSettings({ quizModuleName });
createRoot(document.getElementById("root")!).render(<App {...settings} />);
