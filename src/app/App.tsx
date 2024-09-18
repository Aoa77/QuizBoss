import AppSettings from "./AppSettings";
import AppVersion from "../components/AppVersion";
import GuessButtons from "../components/GuessButtons";
import LoadingSpinner from "../components/LoadingSpinner";
import ProgressDisplay from "../components/ProgressDisplay";
import QuestionHeading from "../components/QuestionHeading";
import QuestionImage from "../components/QuestionImage";
import ScoreDisplay from "../components/ScoreDisplay";
import TitleHeading from "../components/TitleHeading";
import useElementController from "../hooks/useElementController";
import useEventRouter from "../hooks/useEventRouter";
import useStateController from "../hooks/useStateController";
import "../components/styles";
import AppContext from "./AppContext";
import SettingsPanel from "../components/SettingsPanel";

export default function App(settings: AppSettings) {
    AppContext.initSettings(settings);
    AppContext.initAppState(useStateController());
    AppContext.initElements(useElementController());

    useEventRouter();
    return (
        <main>
            <TitleHeading />
            <LoadingSpinner />
            <QuestionImage />
            <QuestionHeading />
            <GuessButtons />
            <ScoreDisplay />
            <ProgressDisplay />
            <AppVersion />
            <SettingsPanel />
        </main>
    );
}
