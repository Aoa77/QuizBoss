///
import { AppSettings } from "./settings";
import { useAppContextSetup } from "./context";

///
import { AnswerPoints } from "../components/AnswerPoints";
import { AnswerPointsTimeBonus } from "../components/AnswerPoints.TimeBonus";
import { AppTitle } from "../components/AppTitle";
import { GuessButtons } from "../components/GuessButtons";
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
            <AnswerPoints />
            <AnswerPointsTimeBonus />
            <AppTitle />
            <GuessButtons />
            <LoadingSpinner />
            <QuestionImage />
            <QuestionText />
            <QuestionTimer />
            <QuizProgress />
            <QuizTitle />
            <ScoreInfo />
        </main>
    );
}
