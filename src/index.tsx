import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import jsonData from "./data/WorldFlags.json";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <App
        quizTitle="World Flags Quiz"
        itemQuestion="Which country does this flag belong to?"
        jsonData={jsonData}
    />,
);
