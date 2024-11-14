///
import { AppSettings } from "../../core/settings";
import { useAppContextSetup } from "../../core/context";
import * as section from "../sections";

///
export function App(settings: AppSettings) {
    useAppContextSetup(settings);
    return (
        <main>
            <section.AnswerPoints />
            <section.AnswerPointsTimeBonus />
            <section.AppTitle />
            <section.AppVersion />
            <section.GuessButtons />
            <section.LoadingSpinner />
            <section.QuestionImage />
            <section.QuestionText />
            <section.QuestionTimer />
            <section.QuizProgress />
            <section.QuizTitle />
            <section.ScoreInfo />
        </main>
    );
}
