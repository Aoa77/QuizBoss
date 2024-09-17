import { createRoot } from "react-dom/client";
import App from "./app/App";
import AppConfig from "./app/AppConfig";
import AppSettings from "./app/AppSettings";

const {
    quizModuleName, ////////
    demoMode,
    guessButtonCount,
    maxQuestions,
    speed,
}: AppSettings = AppConfig("quizboss-world-flags");

createRoot(document.getElementById("root")!).render(
    <App
        quizModuleName={quizModuleName}
        demoMode={demoMode}
        guessButtonCount={guessButtonCount}
        maxQuestions={maxQuestions}
        speed={speed}
    />,
);
