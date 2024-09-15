import ReactDOM from "react-dom/client";
import { App, AppConfig, useQueryParams } from "./app";

function SETUP() {
    const quizModuleName = "quizboss-world-flags";
    const queryParams = useQueryParams(window.location.search);
    return new AppConfig({ quizModuleName }, queryParams);
}

const { quizModuleName, demoMode, guessButtonCount, maxQuestions } = SETUP();
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
