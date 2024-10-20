/* stylesheets */
import "./App.layout.css";

/* models */
import { AppSettings } from "./AppSettings";
import { $QuizTitle, QuizTitle } from "../components/QuizTitle";
import { useEffect } from "react";
import { Task } from "../libs/csharp-sim/Task";
import { $LoadingSpinner, LoadingSpinner } from "../components/LoadingSpinner";

/* context */

export function App(settings: AppSettings) {
    useEffect(() => {
        async function run() {
            await Task.delay(500);
            $QuizTitle.fadeIn.start();
            await $LoadingSpinner.fadeIn.start();
            $LoadingSpinner.loop.play();
            await Task.delay(1765);
            $LoadingSpinner.loop.pause();
            await Task.delay(1765);
            $LoadingSpinner.loop.restart();
            await Task.delay(1765);
            $LoadingSpinner.loop.pause();
            await Task.delay(1765);
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
