/* stylesheets */
import "./App.layout.css";

/* models */
import { AppSettings } from "./AppSettings";
import { $QuizTitle, QuizTitle } from "../components/QuizTitle";
import { useEffect } from "react";
import { Task } from "../libs/anime+/Task";

/* context */

export function App(settings: AppSettings) {
    useEffect(() => {
        async function run() {
            while (true) {
                await $QuizTitle.fadeIn.start();
                await Task.delay(1000);
                await $QuizTitle.fadeOut.start();
                await Task.delay(1000);
            }
        }
        run();
    }, []);

    return (
        <main>
            <QuizTitle text={settings.quizModuleName} />
        </main>
    );
}
