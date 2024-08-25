import App from "./components/App";
import ReactDOM from "react-dom/client";
import { ConfigDefaults } from "./components/Config";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <App
        quizModuleName="quizboss-world-flags"
        guessButtonCount={ConfigDefaults.guessButtonCount}
        loadThrottle={ConfigDefaults.loadThrottle}
        maxQuestions={ConfigDefaults.maxQuestions}
        nextDelay={ConfigDefaults.nextDelay}
        spinnerPoll={ConfigDefaults.spinnerPoll}
    />,
);
