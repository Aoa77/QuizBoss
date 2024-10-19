/* stylesheets */
import "./App.layout.css";
import "./App.sections.css";

/* models */
import { AppSettings } from "./AppSettings";
import { QuizTitle } from "../components/QuizTitle";

/* context */

export function App(settings: AppSettings) {
    return (
        <main>
            <QuizTitle text={settings.quizModuleName} />
        </main>
    );
}
