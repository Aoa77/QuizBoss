import { QuizApp } from "./components/QuizApp";
import ReactDOM from "react-dom/client";
import jsonData from "./data/WorldFlags.json";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <QuizApp
        quizTitle="World Flags Quiz"
        itemQuestion="Which country does this flag belong to?"
        jsonData={jsonData}
        // imageLoadThrottle={50}
        // resultDisplayTime={1500}
        // spinnerPollingDelay={500}
        // spinnerPollingInterval={100}
    />,
);
