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
import { useFlow } from "../appFlow/useFlow";
import useAnimation from "../elements/useAnimation";

export default function App(settings: AppSettings) {
    ///
    const [state] = useFlow(settings);
    
    ///
    useAnimation(settings.speed);
    
    ///
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
