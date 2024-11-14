///
import { AppSettings } from "../code/settings";
import { useAppContextSetup } from "../code/AppContext";
import * as component from "../components";

///
export function App(settings: AppSettings) {
    useAppContextSetup(settings);
    return (
        <main>
            <component.AnswerPoints />
            <component.AnswerPointsTimeBonus />
            <component.AppTitle />
            <component.AppVersion />
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
