import "../styles";
import { useAppState } from "../hooks/useAppState";
import { useAnimation } from "../hooks/useAnimation";
import { AppVersion } from "./AppVersion";
import { GuessButtonArea } from "./GuessButtonArea";
import { LoadingSpinner } from "./LoadingSpinner";
import { ProgressDisplay } from "./ProgressDisplay";
import { QuestionHeading } from "./QuestionHeading";
import { QuestionImage } from "./QuestionImage";
import { ScoreDisplay } from "./ScoreDisplay";
import { SettingsPanel } from "./SettingsPanel";
import { TitleHeading } from "./TitleHeading";
import { AppSettings } from "../models/AppSettings";
import { BonusNotification } from "./BonusNotification";

export function App(settings: AppSettings) {
    ///
    const [state] = useAppState(settings);
    
    ///
    useAnimation(settings.speed);
    
    ///
    return (
        <main>
            <TitleHeading {...state} />
            <LoadingSpinner />
            <QuestionImage {...state} />
            <QuestionHeading {...state} />
            <BonusNotification {...state} />
            <GuessButtonArea {...state} />
            <ScoreDisplay {...state} />
            <ProgressDisplay {...state} />
            <AppVersion />
            <SettingsPanel />
        </main>
    );
}
