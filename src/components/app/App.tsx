///
import { AppSettings } from "../../game/settings";
import { useAppContextSetup } from "../../game/context";
import * as component from "../sections";

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
