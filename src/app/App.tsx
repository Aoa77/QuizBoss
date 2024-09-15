import "./styles";
import { AppConfig } from ".";

///
import {
    useAppContext,
    useElementController,
    useEventRouter,
    useStateController,
} from "../hooks";

///
import {
    AppVersion,
    GuessButtons,
    LoadingSpinner,
    ProgressDisplay,
    QuestionHeading,
    QuestionImage,
    ScoreDisplay,
    TitleHeading,
} from "../components";

///
export default function App(config: AppConfig) {
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
