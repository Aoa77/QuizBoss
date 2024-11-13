///
import { AppSettings } from "./settings";
import { useAppContextSetup } from "./context";
import * as component from "../components";

///
export function App(settings: AppSettings) {
    useAppContextSetup(settings);
    return (
        <main>
            <component.AnswerPoints />
            <component.AnswerPointsTimeBonus />
            <component.AppTitle />
            <component.GuessButtons />
            <component.LoadingSpinner />
            <component.QuestionImage />
            <component.QuestionText />
            <component.QuestionTimer />
            <component.QuizProgress />
            <component.QuizTitle />
            <component.ScoreInfo />
        </main>
    );
}
