/* stylesheets */
import "./App.layout.css";
import "./App.sections.css";

/* models */
import { AppSettings } from "./AppSettings";
import { $QuizTitle, QuizTitle } from "../components/QuizTitle";
import { useEffect } from "react";

/* context */

export function App(settings: AppSettings) {

    useEffect(() => {
        async function run() {
            await $QuizTitle.fadeIn.startAsync();
            await $QuizTitle.fadeOut.startAsync();
        }
        run();
    }, []);

    return (
        <main>
            <QuizTitle text={settings.quizModuleName} />
        </main>
    );
}
