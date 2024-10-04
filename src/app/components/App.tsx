import "../styles";
import { GuessButtonArea } from "./GuessButtonArea";
import { LoadingSpinner } from "./LoadingSpinner";
import { ProgressDisplay } from "./ProgressDisplay";
import { QuestionHeading } from "./QuestionHeading";
import { QuestionImage } from "./QuestionImage";
import { ScoreDisplay } from "./ScoreDisplay";
import { TitleHeading } from "./TitleHeading";
import { AppSettings } from "../models/AppSettings";
import { BonusNotification } from "./BonusNotification";
import { useMemo } from "react";
import { useAppState } from "./useAppState";

///
export function App(settings: AppSettings) {
    ///
    const loadingSpinner = useMemo(() => <LoadingSpinner />, []);
    const bonusNotification = useMemo(() => <BonusNotification />, []);
    const guessButtonArea = useMemo(() => <GuessButtonArea />, []);
    
    ///
    
    const [state] = useAppState(settings);

    ///
    return (
        <main>
            <TitleHeading {...state} />
            {loadingSpinner}
            <QuestionImage {...state} />
            <QuestionHeading {...state} />
            {bonusNotification}
            {guessButtonArea}
            <ScoreDisplay {...state} />
            <ProgressDisplay {...state} />
        </main>
    );
}




