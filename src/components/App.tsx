import "../styles";
import { Config } from "../models";

import {
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
    useElementContext,
    useEventRouter,
    useStateContext,
    useTimeContext,
} from "../hooks";

export default function App(config: Config) {
    const stateContext = useStateContext();
    const timeContext = useTimeContext(config);
    const elementContext = useElementContext(config, stateContext, timeContext);
    const context = useAppContext(
        config,
        elementContext,
        stateContext,
        timeContext,
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
        </main>
    );
}
