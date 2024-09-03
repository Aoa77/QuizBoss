import App from "./components/App";
import ReactDOM from "react-dom/client";
import { ConfigDefaults } from "./models";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <App
        /////////////////////////////////////////
        quizModuleName="quizboss-world-flags"
        /////////////////////////////////////////
        demoMode={ConfigDefaults.demoMode}
        guessButtonCount={ConfigDefaults.guessButtonCount}
        maxQuestions={ConfigDefaults.maxQuestions}
    />,
);
