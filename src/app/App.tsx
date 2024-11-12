///
import { AppSettings } from "./settings";
import { useAppContextSetup } from "./context";

///
import { GuessButtons } from "../components/GuessButtons";
import { GuessPoints } from "../components/GuessPoints";
import { TimeBonus } from "../components/GuessPoints.TimeBonus";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuestionImage } from "../components/QuestionImage";
import { QuestionText } from "../components/QuestionText";
import { QuestionTimer } from "../components/QuestionTimer";
import { QuizProgress } from "../components/QuizProgress";
import { QuizTitle } from "../components/QuizTitle";
import { ScoreInfo } from "../components/ScoreInfo";

///
export function App(settings: AppSettings) {
    useAppContextSetup(settings);
    return (
        <main>
            <QuizTitle />
            <LoadingSpinner />
            <QuestionImage />
            <QuestionText />
            <QuestionTimer />
            <GuessPoints />
            <TimeBonus />
            <QuizProgress />
            <ScoreInfo />
            <GuessButtons />
        </main>
    );
}
