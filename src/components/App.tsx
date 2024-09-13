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
    useContextController,
    useElementController,
    useEventRouter,
    useStateController,
    useTimeController,
} from "../hooks";

export default function App(config: AppConfig) {
    const states = useStateController();
    const time = useTimeController(config);
    const elements = useElementController(config, states, time);
    const context = useContextController(
        config,
        elements,
        states,
        time,
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
