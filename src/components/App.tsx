import "../styles";
import { TimeContext } from "../context";
import { Config } from "../models";

import {
    GuessButtons,
    LoadingSpinner,
    QuestionHeading,
    QuestionImage,
    ScoreDisplay,
    TitleHeading,
    ProgressDisplay,
} from "./AppChildren";

import {
    useAppState,
    useElements,
    useAppContext,
    useEventRouter,
} from "../hooks";

export default function App(config: Config) {
    const stateContext = useAppState();
    const timeContext = new TimeContext();
    const elementContext = useElements(config, stateContext, timeContext);
    const context = useAppContext(config, elementContext, stateContext, timeContext);

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
