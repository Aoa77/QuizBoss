import { App } from "./components/App";
import ReactDOM from "react-dom/client";
import jsonData from "./data/WorldFlags.json";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <App
        quizTitle="World Flags Quiz"
        itemQuestion="Which country does this flag belong to?"
        jsonData={jsonData}
        imageLoadThrottle={50}
        resultDisplayTime={1500}
        spinnerPollingDelay={500}
        spinnerPollingInterval={100}
    />,
);
