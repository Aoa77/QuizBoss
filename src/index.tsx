import ReactDOM from "react-dom/client";
import { App, AppConfig, AppSettings } from "./app";

const {
    quizModuleName, ////////
    demoMode,
    guessButtonCount,
    maxQuestions,
}: AppSettings = AppConfig("quizboss-world-flags");

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <App
        quizModuleName={quizModuleName}
        demoMode={demoMode}
        guessButtonCount={guessButtonCount}
        maxQuestions={maxQuestions}
    />,
);
