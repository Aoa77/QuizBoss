import App from "./components/App";
import { Config } from "./app";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

const {
    quizModuleName, ///////
    demoMode,
    guessButtonCount,
    maxQuestions,
} = new Config({
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
