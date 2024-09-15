import "../styles";
import { AppConfig } from "../app";

import {
    AppVersion,
    GuessButtons,
    LoadingSpinner,
    ProgressDisplay,
    QuestionHeading,
    QuestionImage,
    ScoreDisplay,
    TitleHeading,
} from "./AppChildren";

import {
    useAppContext,
    useElementController,
    useEventRouter,
    useStateController,
} from "../hooks";

export default function App(config: AppConfig) {
    const states = useStateController();
    const elements = useElementController(config, states);
    const context = useAppContext(
        config,
        elements,
        states,
    );

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
