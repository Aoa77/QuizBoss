import "../styles";
import { Config } from "../app";

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

export default function App(config: Config) {
    const stateController = useStateController();
    const timeController = useTimeController(config);
    const elementController = useElementController(config, stateController, timeController);
    const context = useContextController(
        config,
        elementController,
        stateController,
        timeController,
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
