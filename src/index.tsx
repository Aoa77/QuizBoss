import { AppConfig } from "./app";
import App from "./components/App";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

const { quizModuleName, demoMode, guessButtonCount, maxQuestions } =
    new AppConfig({
        quizModuleName: "quizboss-world-flags",
    });

root.render(
    <App
        quizModuleName={quizModuleName}
        demoMode={demoMode}
        guessButtonCount={guessButtonCount}
        maxQuestions={maxQuestions}
    />,
);
