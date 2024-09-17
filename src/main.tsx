import { createRoot } from "react-dom/client";
import App from "./app/App";
import AppSettings from "./app/AppSettings";
import ConfigParams from "./app/ConfigParams";

const quizModuleName = "quizboss-world-flags";
const config: ConfigParams = { quizModuleName };
const settings = new AppSettings(config);

const {
    demoMode, ///////////
    guessButtonCount,
    maxQuestions,
    speed,
} = settings;

createRoot(document.getElementById("root")!).render(
    <App
        quizModuleName={quizModuleName}
        demoMode={demoMode}
        guessButtonCount={guessButtonCount}
        maxQuestions={maxQuestions}
        speed={speed}
    />,
);
