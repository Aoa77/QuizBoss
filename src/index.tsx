import { QuizApp } from "./components/QuizApp";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <QuizApp
        quizModuleName="quizboss-world-flags"
        // imageLoadThrottle={50}
        // resultDisplayTime={1500}
        // spinnerPollingDelay={500}
        // spinnerPollingInterval={100}
    />,
);
