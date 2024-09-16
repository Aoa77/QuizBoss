import AppVersion from "../components/AppVersion";
import GuessButtons from "../components/GuessButtons";
import LoadingSpinner from "../components/LoadingSpinner";
import ProgressDisplay from "../components/ProgressDisplay";
import QuestionHeading from "../components/QuestionHeading";
import QuestionImage from "../components/QuestionImage";
import ScoreDisplay from "../components/ScoreDisplay";
import TitleHeading from "../components/TitleHeading";
import useAppContext from "../hooks/useAppContext";
import useElementController from "../hooks/useElementController";
import useEventRouter from "../hooks/useEventRouter";
import useStateController from "../hooks/useStateController";
import AppSettings from "./AppSettings";
import "./styles";

export default function App(config: AppSettings) {
    const states = useStateController();
    const elements = useElementController(config, states);
    const context = useAppContext(config, elements, states);

    useEventRouter(context);
    return (
        <main>
            <TitleHeading {...context} />
            <LoadingSpinner {...context} />
            <QuestionImage {...context} />
            <QuestionHeading {...context} />
            <GuessButtons {...context} />
            <ScoreDisplay {...context} />
            <ProgressDisplay {...context} />
            <AppVersion {...context} />
        </main>
    );
}
