import "../styles";
import AppSettings from "../appFlow/AppSettings";
import AppVersion from "./AppVersion";
import GuessButtonArea from "./GuessButtonArea";
import LoadingSpinner from "./LoadingSpinner";
import ProgressDisplay from "./ProgressDisplay";
import QuestionHeading from "./QuestionHeading";
import QuestionImage from "./QuestionImage";
import ScoreDisplay from "./ScoreDisplay";
import SettingsPanel from "./SettingsPanel";
import TitleHeading from "./TitleHeading";
import { useAppStateFlow } from "../appFlow/useAppStateFlow";

export default function App(settings: AppSettings) {
    const [state] = useAppStateFlow(settings);
    return (
        <main>
            <TitleHeading {...state} />
            <LoadingSpinner />
            <QuestionImage {...state} />
            <QuestionHeading {...state} />
            <GuessButtonArea {...state} />
            <ScoreDisplay {...state} />
            <ProgressDisplay {...state} />
            <AppVersion />
            <SettingsPanel />
        </main>
    );
}
