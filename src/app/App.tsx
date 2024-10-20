/* stylesheets */
import "./App.layout.css";

/* models */
import { AppSettings } from "./AppSettings";
import { $QuizTitle, QuizTitle } from "../components/QuizTitle";
import { useEffect } from "react";
import { Task } from "../libs/csharp-sim/Task";
import { $LoadingSpinner, LoadingSpinner } from "../components/LoadingSpinner";
import { Duration } from "../models/Duration";

/* context */

export function App(settings: AppSettings) {
    useEffect(() => {
        async function run() {
            await Task.delay(Duration.Delay);
            await $QuizTitle.fadeIn.start();
            await Task.delay(Duration.Delay);
            await $LoadingSpinner.fadeIn.start();
            $LoadingSpinner.loop.play();
        }

        run();
    }, []);

    return (
        <main>
            <QuizTitle text={settings.quizModuleName} />
            <LoadingSpinner />
        </main>
    );
}
