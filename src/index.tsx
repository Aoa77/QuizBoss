import App from "./components/App";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <App
        quizModuleName="quizboss-world-flags"
        loadThrottle={50}
        nextDelay={500}
        spinnerPoll={100}
    />,
);
