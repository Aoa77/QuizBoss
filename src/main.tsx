import { createRoot } from "react-dom/client";
import { App } from "../temp/app/components/App";
import { AppSettings } from "../temp/app/models/AppSettings";

const quizModuleName = "quizboss-world-flags";
const settings = new AppSettings({ quizModuleName });
createRoot(document.getElementById("root")!).render(<App {...settings} />);
