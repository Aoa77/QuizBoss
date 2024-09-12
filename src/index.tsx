import App from "./components/App";
import ReactDOM from "react-dom/client";
import { ConfigDefaults } from "./models";

// Function to parse query string
const getQueryParams = (query: string) => {
    return query
        .substring(1)
        .split("&")
        .reduce((params: { [key: string]: string }, param) => {
            const [key, value] = param.split("=");
            params[key] = value;
            return params;
        }, {});
};

// Get query parameters from the URL
const queryParams = getQueryParams(window.location.search);

// Check if demoMode is set to true in the query string
const demoMode = queryParams.demoMode === "true" || ConfigDefaults.demoMode;

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <App
        quizModuleName="quizboss-world-flags"
        demoMode={demoMode}
        guessButtonCount={ConfigDefaults.guessButtonCount}
        maxQuestions={ConfigDefaults.maxQuestions}
    />,
);
